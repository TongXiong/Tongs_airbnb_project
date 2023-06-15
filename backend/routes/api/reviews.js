const express = require('express');
const { Op } = require('sequelize');
const { sequelize } = require("../../db/models")
const bcrypt = require('bcryptjs');
const { Spot, Review, User, Booking, SpotImage, ReviewImage} = require("../../db/models")
const router = express.Router()
const { check } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth")

router.get("/current", restoreUser, requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where : {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: Spot,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "description"],
                    include: [
                        [sequelize.fn("", sequelize.col("url")), "previewImage"]
                    ]
                },
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ],
        attributes: ["id", "userId", "spotId", "review", "stars", "createdAt", "updatedAt"],
        group: ["Review.id", "User.id", "Spot.id", "ReviewImages.url"]
    })
    res.json({
        reviews
    })
})



module.exports = router;
