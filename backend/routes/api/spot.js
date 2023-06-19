const express = require('express');
const { Op } = require('sequelize');
const { sequelize } = require("../../db/models")
const bcrypt = require('bcryptjs');
const { Spot, Review, User, Booking, SpotImage, ReviewImage } = require("../../db/models")
const router = express.Router()
const { validPagination, validatePost, validateImage, validReview, validBooking } = require("../../Validators/express-validators.js")

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");

// Add Query Filters to Get All Spots
const query = (req, res) => {
    let { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query
    let where = {}
    if (minLat && maxLat) {
        where.lat = {
            [Op.between]: [minLat, maxLat]
        }
    } else if (minLat) {
        where.lat = {
            [Op.gte]: minLat
        }
    } else if (maxLat) {
        where.lat = {
            [Op.lte]: maxLat
        }
    }
    if (minLng && maxLng) {
        where.lng = {
            [Op.between]: [minLng, maxLng]
        }
    } else if (minLng) {
        where.lng = {
            [Op.lte]: minLng
        }
    } else if (maxLng) {
        where.lng = {
            [Op.gte]: maxLng
        }
    }
    if (minPrice && maxPrice) {
        where.price = {
            [Op.between]: [minPrice, maxPrice]
        }
    } else if (minPrice) {
        where.price = {
            [Op.gte]: minPrice
        }
    } else if (maxPrice) {
        where.price = {
            [Op.lte]: maxPrice
        }
    }
    return where
}

// Get all Spots

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
                attributes: ["id", "url", "preview"],
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
        // parseInt(obj.avgRating)

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

// Get all Spots owned by the Current User
router.get("/current", restoreUser, requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            {
                model: Review,

            },
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"],
            }
        ],
    })

    if (!spots.length) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

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
    })
})

// Get details of a Spot from an id
router.get("/:spotId", async (req, res) => {
    const spots = await Spot.findAll({
        where: {
            id: req.params.spotId
        },
        include: [
            {
                model: User, as: "Owner",
                attributes: ["id", "firstName", "lastName"],
            },
            {
                model: Review,
            },
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"],
            }
        ],
        attributes: {
            include: [
                [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"]
            ],
        },
        
    })

    if (!spots.length) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    const all = spots.map(spot => {
        const obj = spot.toJSON()
        let stars = 0;

        for (let review of obj.Reviews) {
            stars += review.stars;
        }

        obj.avgStarRating = stars / obj.Reviews.length

        // if (obj.SpotImages.length > 0) {
        //     obj.previewImage = obj.SpotImages[0].url
        // }

        delete obj.Reviews;

        return obj


    })

    return res.json({
        Spots: all,
    })
})

//     const spots = await Spot.findByPk(req.params.spotId, {
//         include: [
//             {
//                 model: User, as: "Owner",
//                 attributes: ["id", "firstName", "lastName"],
//             },
//             {
//                 model: SpotImage,
//                 attributes: ["id", "url", "preview"]
//             },
//             {
//                 model: Review,
//                 attributes: []
//             }
//         ],
//         attributes: {
//             include: [
//                 [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
//                 [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"]
//             ],

//         },
//         group: ["Spot.id", "SpotImages.id", "Owner.id"]
//     })
//     if (spots === null) {
//         const err = new Error("Spot couldn't be found")
//         err.status = 404
//         res.status(err.status || 500)
//         return res.json({
//             message: err.message
//         })
//     }
//     return res.json(spots)
// })

// Get all Reviews by a Spot's id
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
        group: ["Review.id", "User.id", "Spot.id", "ReviewImages.id"]
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

// Get all Bookings for a Spot based on the Spot's id
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

// Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", restoreUser, requireAuth, validBooking, async (req, res, next) => {
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


// Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", restoreUser, requireAuth, validReview, async (req, res) => {
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

// Create a Spot
router.post("/", restoreUser, requireAuth, validatePost, async (req, res) => {
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

// Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", restoreUser, requireAuth, validateImage, async (req, res) => {
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

// Edit a Spot
router.put("/:spotId", restoreUser, requireAuth, validatePost, async (req, res) => {
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

// Delete a Spot
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
