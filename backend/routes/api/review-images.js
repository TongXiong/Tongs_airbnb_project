const express = require('express');
const { Op } = require('sequelize');
const { sequelize } = require("../../db/models")
const bcrypt = require('bcryptjs');
const { Spot, Review, User, Booking, SpotImage, ReviewImage } = require("../../db/models")
const router = express.Router()
const { check, body } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth")

// Delete a Review Image
router.delete("/:reviewImageId", restoreUser, requireAuth, async (req, res) => {
    const reviewImage1 = await ReviewImage.findOne({
        where: {
            id: req.params.reviewImageId
        },
        include: {
            model: Review,
            attributes: ["userId"],
        }
    })
    if (!reviewImage1) {
        res.status(404)
         return res.json({
            message: "Review Image couldn't be found"
        })
    }
    const owner = reviewImage1.Review.userId

    if (owner === req.user.id) {
        await reviewImage1.destroy()
         return res.json({
            message: "Successfully deleted"
        })
    } else {
        res.status(403)
         return res.json({
            message: "Forbidden"
        })
    }
})


module.exports = router
