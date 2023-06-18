const { check, body } = require('express-validator');
const { handleValidationErrors } = require("../utils/validation");
const { Spot, Review, User, Booking, SpotImage, ReviewImage } = require("../db/models")

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
        .isLength({ min: 3, max: 50 })
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

const validPagination = [
    body("page").custom((value, { req }) => {
        let number = parseInt(req.query.page)
        let arrKey = Object.keys(req.query)
        if (arrKey[0] === "page") {
            if (number < 1 || number > 10) {
                throw new Error("min pages is 1 and max pages is 10")
            } else {
                return number
            }
        }
        return true
    }),
    body("size").custom((value, { req }) => {
        let number = parseInt(req.query.size)
        let arrKey = Object.keys(req.query)
        if (arrKey[1] === "size") {
            if (number < 1 || number > 20) {
                throw new Error("min pages is 1 and max pages is 20")
            } else {
                return number
            }
        }
        return true
    }),
    body("minLat").custom((value, { req }) => {
        let number = parseInt(req.query.minLat)
        let arrKey = Object.keys(req.query)
        if (arrKey[0] === "minLat") {
            if (!isNaN(number)) {
                return number
            } else {
                throw new Error("Minimum latitude is invalid")
            }
        } else {
            return true;
        }
    }),
    body("maxLat").custom((value, { req }) => {
        let number = parseInt(req.query.maxLat)
        let arrKey = Object.keys(req.query)
        if (arrKey[0] === "maxLat") {
            if (!isNaN(number)) {
                return number
            } else {
                throw new Error("Maximum latitude is invalid")
            }
        } else {
            return true;
        }
    }),
    body("minLng").custom((value, { req }) => {
        let number = parseInt(req.query.minLng)
        let arrKey = Object.keys(req.query)
        if (arrKey[0] === "minLng") {
            if (!isNaN(number)) {
                return number
            } else {
                throw new Error("Minimum longitude is invalid")
            }
        } else {
            return true;
        }
    }),
    body("maxLng").custom((value, { req }) => {
        let number = parseInt(req.query.maxLng)
        let arrKey = Object.keys(req.query)
        if (arrKey[0] === "maxLng") {
            if (!isNaN(number)) {
                return number
            } else {
                throw new Error("Maximum longitude is invalid")
            }
        } else {
            return true;
        }
    }),
    body("minPrice").custom((value, { req }) => {
        let number = parseInt(req.query.minPrice)
        let arrKey = Object.keys(req.query)
        if (arrKey[0] === "minPrice") {
            if (!isNaN(number)) {
                if (number < 0) {
                    throw new Error("Minimum price must be greater than or equal to 0")
                }
                return number
            } else {
                throw new Error("Minimum Price is invalid")
            }
        } else {
            return true;
        }
    }),
    body("maxPrice").custom((value, { req }) => {
        let number = parseInt(req.query.maxPrice)
        let arrKey = Object.keys(req.query)
        if (arrKey[0] === "maxPrice") {
            if (!isNaN(number)) {
                if (number < 0) {
                    throw new Error("Maximum price must be greater than or equal to 0")
                }
                return number
            } else {
                throw new Error("Maximum Price is invalid")
            }
        } else {
            return true;
        }
    }),
    handleValidationErrors
]



module.exports = { validPagination, validatePost, validateImage, validReview, validBooking }
