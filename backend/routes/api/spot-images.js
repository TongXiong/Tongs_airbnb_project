const express = require('express');
const { Op } = require('sequelize');
const { sequelize } = require("../../db/models")
const bcrypt = require('bcryptjs');
const { Spot, Review, User, Booking, SpotImage, ReviewImage } = require("../../db/models")
const router = express.Router()
const { check, body } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth")

// Delete a Spot Image
router.delete("/:spotImageId", restoreUser, requireAuth, async (req, res) => {
    const spotImage1 = await SpotImage.findOne({
        where: {
            id: req.params.spotImageId
        },
        include: {
            model: Spot,
            attributes: ["ownerId"]
        }
    })
    if (!spotImage1) {
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found"
        })
    }
    const owner = spotImage1.Spot.ownerId

    if (owner === req.user.id) {
        await spotImage1.destroy()
        return res.json({
            message: "Successfully deleted"
        })
    } else {
        res.json({
            message: "Forbidden"
        })
    }
})


module.exports = router
