const express = require('express');
const { Op } = require('sequelize');
const { sequelize } = require("../../db/models")
const bcrypt = require('bcryptjs');
const { Spot, Review, User, Booking, SpotImage, ReviewImage } = require("../../db/models")
const router = express.Router()
const { check, body } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth")

router.delete("/:reviewImageId", restoreUser, requireAuth, async (req, res) => {
    const reviewImage1 = await ReviewImage.findOne({
        where: {
            id: req.params.reviewImageId
        },
        include: {
            model: Review,
            attributes: ["spotId"],
            include: {
                model: Spot,
                attributes: ["ownerId"]
            }
        }
    })
    if (!reviewImage1) {
        res.status(404)
         res.json({
            message: "Review Image couldn't be found"
        })
    }
    const owner = reviewImage1.Review.Spot.ownerId

    if (owner === req.user.id) {
        await reviewImage1.destroy()
         res.json({
            message: "Successfully deleted"
        })
    } else {
         res.json({
            message: "Forbidden"
        })
    }
})


module.exports = router
