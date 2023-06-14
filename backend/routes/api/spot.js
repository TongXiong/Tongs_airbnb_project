const express = require('express');
const { Op } = require('sequelize');
const { sequelize } = require("../../db/models")
const bcrypt = require('bcryptjs');
const { Spot, Review, User, Booking, SpotImage} = require("../../db/models")
const router = express.Router()
const { check } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation")

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth")

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
      .isLength({min: 3, max: 50})
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

router.get("/", async (req, res) => {
    const spots = await Spot.findAll({
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
        group: ["Spot.id"]
    })
    res.json({
        spots
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
        group: ["Spot.id"]
    })
    res.json(spots)
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
        group: ["Spot.id"]
    })
    if (spots === null) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        res.status(err.status || 500)
        res.json({
            message: err.message
        })
    }
    res.json({
        spots
    })
})

router.post("/", validatePost, restoreUser, requireAuth, handleValidationErrors, async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body
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
    res.json({
        newSpot
    })
})

router.post("/:spotId/images", validateImage, restoreUser, requireAuth, async (req, res) => {
    const { url, preview } = req.body
    const currentSpot = await Spot.findOne({
        where: {
            id: req.params.spotId,
            ownerId: req.user.id
        },
        attributes: {
            exclude: ["id"]
        }
    })
    if (currentSpot) {
        const newImage = await currentSpot.createSpotImage({
            url,
            preview,
        })
        res.json(newImage)
    } else {
        res.status(404)
        res.json({
            message: "Spot couldn't be found"
        })
    }
})

router.put("/:spotId", validatePost, restoreUser, requireAuth, async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const editSpot = await Spot.findOne({
        where: {
            id: req.params.spotId,
            ownerId: req.user.id
        }
    })
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
        res.json({
            editSpot
        })
    } else if (!editSpot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        res.status(err.status || 500)
        res.json({
            message: err.message
        })
    }
})

router.delete("/:spotId", restoreUser, requireAuth, async (req, res, next) => {
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId,
            ownerId: req.user.id,
        }
    })
    if (spot) {
        await spot.destroy()
        res.json({
            message: "Succesfully deleted"
        })
    } else {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        res.status(err.status || 500)
        res.json({
            message: err.message
        })
    }
})

router.use((err, req, res, next) => {
    if (err) {
        res.status(err.status)
        res.json (err.errors)
    }
})

module.exports = router;
