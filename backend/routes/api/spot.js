const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { Spot, Review, User, Booking} = require("../../db/models")
const router = express.Router()

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth")

router.get("/", async (req, res) => {
    const spots = await Spot.findAll({
        include: {
            model: Review,
        }
    })
    res.json({
        spots
    })
})

router.post("/", async (req, res) => {
    const {address, city, state, country, lat, lng, name, description} = req.body
    const newSpot = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description
    })
    res.json({
        message: "Successfully created a new spot",
        newSpot
    })
})

router.get("/current", restoreUser, requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    })
    res.json(spots)
})

router.get("/:spotId", async (req, res) => {
    const spots = await Spot.findByPk(req.params.spotId)
    res.json({
        spots
    })
})


router.use((err, req, res, next) => {
    if (err) {
        res.status(err.status)
        res.json (err.errors)
    }
})

module.exports = router;
