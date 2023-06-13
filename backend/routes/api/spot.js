const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { Spot } = require("../../db/models")
const router = express.Router()

router.get("/", async (req, res) => {
    const spots = Spot.findAll({})
})

module.exports = router;
