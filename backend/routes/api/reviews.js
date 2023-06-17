const express = require('express');
const { Op } = require('sequelize');
const { sequelize } = require("../../db/models")
const bcrypt = require('bcryptjs');
const { Spot, Review, User, Booking, SpotImage, ReviewImage} = require("../../db/models")
const router = express.Router()
const { check } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth")

const validReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt({
            min: 1,
            max: 5
        })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

const validateImage = [
    check('url')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("url is required"),
        handleValidationErrors
]

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
        group: ["Review.id", "User.id", "Spot.id", "ReviewImages.url", "ReviewImages.id"]
    })
    res.json({
        reviews
    })
})

router.post("/:reviewId/images", validateImage, restoreUser, requireAuth, async (req, res) => {
    const { url } = req.body
    const currentReview = await Review.findOne({
        where: {
            id: req.params.reviewId,
        },
        include: {
            model: ReviewImage,
            attributes: ["id", "url"]
        }
    })
    if (!currentReview) {
        res.status(404)
        res.json({
            message: "Review couldn't be found"
        })
    }

    let arrOfImages = [currentReview.url]
    for (let image of currentReview.ReviewImages) {
        arrOfImages.push(image.url)
    }
    console.log(arrOfImages)
    const owner = currentReview.userId
    if (owner === req.user.id) {
        if (currentReview && arrOfImages.length < 11) {
            const newImage = await currentReview.createReviewImage({
                url,
                attributes: ["createdAt", "preview"]
            })
            res.status(201)
            return res.json({
                id: newImage.id,
                url: newImage.url,
            })
        } else {
            res.status(403)
           return res.json({
                message: "Maximum number of images for this resource was reached"
            })
        }
    } else {
        res.status(403)
        return res.json({
            message: "forbidden"
        })
    }
})

router.put("/:reviewId", validReview, restoreUser, requireAuth, async (req, res) => {
    const { review, stars } = req.body
    const reviewSpot = await Review.findOne({
        where: {
            id: req.params.reviewId,
        }
    })
    if (!reviewSpot) {
        const err = new Error("Review couldn't be found")
        err.status = 404
        res.status(err.status || 500)
        return res.json({
            message: err.message
        })
    }

    const owner = reviewSpot.userId
    if (owner === req.user.id) {
        if (reviewSpot) {
            if (review) {
                reviewSpot.review = review
            }
            if (stars) {
                reviewSpot.stars = stars
            }
            await reviewSpot.save()
            res.status(200)
            return res.json(reviewSpot)
        }
    } else {
        res.status(403)
        return res.json({
            message: "forbidden"
        })
    }
})

router.delete("/:reviewId", restoreUser, requireAuth, async (req, res, next) => {
    const review = await Review.findOne({
        where: {
            id: req.params.reviewId,
        }
    })
    if (!review) {
        const err = new Error("Review couldn't be found")
        err.status = 404
        res.status(err.status || 500)
        return res.json({
            message: err.message
        })
    }
    const owner = review.userId
    if (owner === req.user.id) {
        if (review) {
            await review.destroy()
            res.json({
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
