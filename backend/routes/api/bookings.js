const express = require('express');
const { Op } = require('sequelize');
const { sequelize } = require("../../db/models")
const bcrypt = require('bcryptjs');
const { Spot, Review, User, Booking, SpotImage, ReviewImage } = require("../../db/models")
const router = express.Router()
const { check, body } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth")
const { validPagination, validatePost, validateImage, validReview, validBooking } = require("../../Validators/express-validators.js")

// Get all of the Current User's Bookings
router.get("/current", restoreUser, requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
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
        group: ["Booking.id", "Spot.id", "Spot->SpotImages.url"]
    })

    if (!bookings.length) {
        res.status(404)
        return res.json({
            message: "Bookings couldn't be found"
        })
    }
    if (bookings) {
        return res.json({
            bookings
        })
    }
})

// Edit a Booking
router.put("/:bookingId", restoreUser, requireAuth, validBooking, async (req, res) => {
    const { startDate, endDate } = req.body
    const bookingSpot = await Booking.findOne({
        where: {
            id: req.params.bookingId
        }
    })

    if (!bookingSpot) {
        const err = new Error("Booking couldn't be found")
        err.status = 404
        res.status(err.status || 500)
        return res.json({
            message: err.message
        })
    }

    let owner = bookingSpot.userId
    if (owner === req.user.id) {
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
        }
    } else {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    let end = new Date(endDate).getTime()
    let current = new Date().toJSON().slice(0, 10)
    let realCurrent = new Date(current).getTime()
    if (realCurrent > end) {
        res.status(403)
        return res.json({
            message: "Past bookings can't be modified"
        })
    }
})

// Delete a Booking
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
    let start = new Date(book.startDate).getTime()
    let end = new Date(book.endDate).getTime()
    let current = new Date().toJSON().slice(0, 10)
    let realCurrent = new Date(current).getTime()
    let owner = book.Spot.ownerId
    if (book.userId === req.user.id || owner === req.user.id) {
        if (realCurrent > start && realCurrent < end) {
            res.status(403)
            return res.json({
                message: "Bookings that have been started can't be deleted"
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
