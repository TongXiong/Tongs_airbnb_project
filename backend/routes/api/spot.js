const express = require('express');
const { Op } = require('sequelize');
const { sequelize } = require("../../db/models")
const bcrypt = require('bcryptjs');
const { Spot, Review, User, Booking, SpotImage, ReviewImage } = require("../../db/models")
const router = express.Router()
const { check, body } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
// const { toDate } = require('sequelize/types/utils');

const validatePost = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("state is required"),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isDecimal({
            allow_leading_zeroes: true
        })
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isDecimal({
            allow_leading_zeroes: true
        })
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 3, max: 50 })
        .notEmpty()
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .isInt()
        .notEmpty()
        .withMessage("Price per day is required"),
    check("price")
        .not()
        .isString()
        .withMessage("Please provide an amount in Numbers"),
    handleValidationErrors
];

const validateImage = [
    check('url')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("url is required"),
    check('preview')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isBoolean()
        .withMessage("is it previewed?"),
    handleValidationErrors
]

const validReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt({
            min: 1,
            max: 5
        })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

const validBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isDate()
        .withMessage("Needs to be in a form of date 'yyyy-mm-dd'"),
    body('startDate').custom(async value => {
        const dates = await Booking.findAll({
            attributes: ["startDate"]
        })
        for (let date of dates) {
            if (value === date.startDate.slice(0, 10)) {
                throw new Error("Start date conflicts with an existing booking")
            }
        }
    }),
    check("endDate"),
    body('endDate').custom(async value => {
        const dates = await Booking.findAll({
            attributes: ["endDate"]
        })
        for (let date of dates) {
            if (value === date.endDate.slice(0, 10)) {
                throw new Error("End date conflicts with an existing booking")
            }
        }
    }),
    check("endDate"),
    body("endDate").custom((value, { req }) => {
        let realStartDate = new Date(req.body.startDate).getTime()
        let realEndDate = new Date(value).getTime()
        if (realEndDate <= realStartDate) {
            throw new Error("end Date cannot be on or before start Date")
        }
        return value
    }),
    check('endDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isDate()
        .withMessage("Needs to be in a form of date 'yyyy-mm-dd'"),
    handleValidationErrors
]

const validPagination = [
    check("page")
        .isInt({
            min: 1,
            max: 10
        })
        .withMessage("min pages is 1 and max pages is 10"),
    check("size")
        .isInt({
            min: 1,
            max: 20
        })
        .withMessage("min size is 1 and max size is 20"),
    handleValidationErrors
]

const query = (req, res) => {
    let { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query
    let where = {}
    if (minLat) {
        where.lat = minLat
    }
    if (maxLat) {
        where.lat = maxLat
    }
    if (minLng) {
        where.lng = minLng
    }
    if (maxLng) {
        where.lng = maxLng
    }
    if (minPrice) {
        where.price = minPrice
    }
    if (maxPrice) {
        where.price = maxPrice
    }
    return where
}

router.get("/", validPagination, async (req, res) => {

    let { page, size } = req.query

    if (!page) {
        page = 1
    }
    if (!size) {
        size = 20
    }

    page = parseInt(page)
    size = parseInt(size)
    const pagination = {}

    if ((page >= 1 && page <= 10) && (size >= 1 && size <= 20)) {
        pagination.limit = size
        pagination.offset = size * (page - 1)
    }

    const where = query(req, res)
    const spots = await Spot.findAll({
        where,
        include: [
            {
                model: Review,

            },
            {
                model: SpotImage,
                attributes: ["url"],
            }
        ],

        ...pagination
    })

    const all = spots.map(spot => {
        const obj = spot.toJSON()

        let stars = 0;

        for (let review of obj.Reviews) {
            stars += review.stars;
        }

        obj.avgRating = stars / obj.Reviews.length

        if (obj.SpotImages.length > 0) {
            obj.previewImage = obj.SpotImages[0].url
        }

        delete obj.Reviews;
        delete obj.SpotImages;

        return obj
    })
    return res.json({
        Spots: all,
        page: page,
        size: size
    })
})


router.get("/current", restoreUser, requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            {
                model: Review,
                attributes: [],
            },
            {
                model: SpotImage,
                attributes: []
            }
        ],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
                [sequelize.fn("", sequelize.col("url")), "previewImage"]
            ],
        },
        group: ["Spot.id", "SpotImages.url"]
    })
    return res.json({
        spots
    })
})

router.get("/:spotId", async (req, res) => {
    const spots = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: User, as: "Owner",
                attributes: ["id", "firstName", "lastName"],
            },
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"]
            },
            {
                model: Review,
                attributes: []
            }
        ],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
                [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"]
            ],
        },
        group: ["Spot.id", "SpotImages.id", "Owner.id"]
    })
    if (spots === null) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        res.status(err.status || 500)
        return res.json({
            message: err.message
        })
    }
    return res.json(spots)
})

router.get("/:spotId/reviews", async (req, res) => { // NEEEEEEEEEDS WOOOOOOOOOO
    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId,
        },
        include: [
            {
                model: User,
                attributes: ["firstName", "lastName"]
            },
            {
                model: Spot,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "description"]
                },
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ],
        attributes: ["id", "userId", "spotId", "review", "stars", "createdAt", "updatedAt"],
        group: ["Review.id"]
    })
    if (!reviews.length) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    } else {
        return res.json({
            reviews
        })
    }
})


router.get("/:spotId/bookings", restoreUser, requireAuth, async (req, res) => {
    const Bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId,
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
        ],
        attributes: ["id", "userId", "spotId", "startDate", "endDate", "createdAt", "updatedAt"],
    })

    if (!Bookings.length) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
    let owner = Bookings[0].userId

    if (owner === req.user.id) {
        return res.json({
            Bookings
        })
    } else {
        const Bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId,
            },
            attributes: ["spotId", "startDate", "endDate"],
        })
        return res.json({
            Bookings
        })
    }
})

router.post("/:spotId/bookings", validBooking, restoreUser, requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body
    const currentSpot = await Spot.findOne({
        where: {
            id: req.params.spotId,
        },
        include: {
            model: Booking,
            attributes: ["userId"]
        }
    })
    if (!currentSpot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    const owner = currentSpot.ownerId
    if (req.user.id !== owner) {
        const newBooking = await currentSpot.createBooking({
            userId: req.user.id,
            startDate,
            endDate,
        })
        return res.json(newBooking)
    } else {
        res.status(403)
        return res.json({
            message: "Must not belong to the current user"
        })
    }
})



router.post("/:spotId/reviews", validReview, restoreUser, requireAuth, async (req, res) => {
    const { review, stars } = req.body
    const currentSpot = await Spot.findOne({
        where: {
            id: req.params.spotId,

        },
        include: {
            model: Review,
            attributes: ["userId"]
        }
    })
    if (!currentSpot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
    let arrOfUser = []
    for (let user of currentSpot.Reviews) {
        arrOfUser.push(user.userId)
    }
    if (arrOfUser.includes(req.user.id)) {
        res.status(500)
        res.json({
            message: "User already has a review for this spot"
        })
    } else if (!arrOfUser.includes(req.user.id)) {
        const newReview = await currentSpot.createReview({
            userId: req.user.id,
            review,
            stars,
        })
        return res.json(newReview)
    }
})


router.post("/", validatePost, restoreUser, requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.status(201)
    res.json(newSpot)
})

router.post("/:spotId/images", validateImage, restoreUser, requireAuth, async (req, res) => {
    const { url, preview } = req.body
    const currentSpot = await Spot.findOne({
        where: {
            id: req.params.spotId,
        },
    })

    if (!currentSpot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
    const owner = currentSpot.ownerId
    if (owner === req.user.id) {
        if (currentSpot) {
            const newImage = await currentSpot.createSpotImage({
                url,
                preview,
                attributes: ["createdAt", "preview"]
            })
            return res.json({
                id: newImage.id,
                url: newImage.url,
                preview: newImage.preview
            })
        }
    } else {
        res.status(403)
        return res.json({
            message: "forbidden"
        })
    }
})

router.put("/:spotId", validatePost, restoreUser, requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const editSpot = await Spot.findOne({
        where: {
            id: req.params.spotId,
        }
    })

    if (!editSpot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        res.status(err.status || 500)
        return res.json({
            message: err.message
        })
    }
    const owner = editSpot.ownerId
    if (owner === req.user.id) {
        if (editSpot) {
            if (address) {
                editSpot.address = address
            }
            if (city) {
                editSpot.city = city
            }
            if (state) {
                editSpot.state = state
            }
            if (country) {
                editSpot.country = country
            }
            if (lat) {
                editSpot.lat = lat
            }
            if (lng) {
                editSpot.lng = lng
            }
            if (name) {
                editSpot.name = name
            }
            if (description) {
                editSpot.description = description
            }
            if (price) {
                editSpot.price = price
            }
            await editSpot.save()
            res.status(200)
            return res.json(editSpot)
        }
    } else {
        res.status(403)
        return res.json({
            message: "forbidden"
        })
    }
})

router.delete("/:spotId", restoreUser, requireAuth, async (req, res, next) => {
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId,
        }
    })
    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        res.status(err.status || 500)
        return res.json({
            message: err.message
        })
    }
    const owner = spot.ownerId
    console.log(owner)
    if (owner === req.user.id) {
        if (spot) {
            await spot.destroy()
            return res.json({
                message: "Succesfully deleted"
            })
        }
    } else {
        res.status(403)
        return res.json({
            message: "forbidden"
        })
    }
})


module.exports = router;
