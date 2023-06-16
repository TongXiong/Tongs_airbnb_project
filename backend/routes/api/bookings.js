const express = require('express');
const { Op } = require('sequelize');
const { sequelize } = require("../../db/models")
const bcrypt = require('bcryptjs');
const { Spot, Review, User, Booking, SpotImage, ReviewImage } = require("../../db/models")
const router = express.Router()
const { check, body } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth")

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

router.get("/current", restoreUser, requireAuth, async (req, res) => {
    let bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ["id"]
            },
            {
                model: Spot,
                include: {
                    model: SpotImage,
                    attributes: []
                }
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
        ],
        attributes: ["id", "userId", "spotId", `startDate`, `endDate`, "createdAt", "updatedAt"],
        group: ["User.id", "Spot.id"]
    })
    res.json({
        bookings
    })
})

router.put("/:bookingId", validBooking, restoreUser, requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body
    const bookingSpot = await Booking.findOne({
        where: {
            id: req.params.bookingId,
            userId: req.user.id
        }
    })
    let end = new Date(endDate).getTime()
    let current = new Date().toJSON().slice(0, 10)
    let realCurrent = new Date(current).getTime()
    if (realCurrent > end) {
        res.status(403)
        return res.json({
            message: "Past bookings can't be modified"
        })
    }
    if (bookingSpot) {
        if (startDate) {
            bookingSpot.startDate = startDate
        }
        if (endDate) {
            bookingSpot.endDate = endDate
        }
        await bookingSpot.save()
        res.status(200)
        return res.json(bookingSpot)
    } else if (!bookingSpot) {
        const err = new Error("Booking couldn't be found")
        err.status = 404
        res.status(err.status || 500)
        return res.json({
            message: err.message
        })
    }
})

router.delete("/:bookingId", restoreUser, requireAuth, async (req, res, next) => {
    const book = await Booking.findOne({
        where: {
            id: req.params.bookingId,
        },
        include: {
            model: Spot,
            attributes: ["ownerId"]
        }
    })

    if (!book) {
        const err = new Error("Booking couldn't be found")
        err.status = 404
        res.status(err.status || 500)
        return res.json({
            message: err.message
        })
    }
    let end = new Date(book.endDate).getTime()
    let current = new Date().toJSON().slice(0, 10)
    let realCurrent = new Date(current).getTime()
    let owner = book.Spot.ownerId
    if (book.userId === req.user.id || owner === req.user.id) {
        if (realCurrent < end) {
            res.status(403)
            return res.json({
                message: "Bookings that have been started can't be deleted"
            })
        } else if (realCurrent > end) {
            res.status(400)
            return res.json({
                message: "Past bookings can't be deleted"
            })
        } else if (book) {
                await book.destroy()
                return res.json({
                    message: "Succesfully deleted"
                })
            }
    } else {
        return res.json({
            message: "Booking must belong to the current user or the Spot must belong to the current user"
        })
    }
})








module.exports = router;
