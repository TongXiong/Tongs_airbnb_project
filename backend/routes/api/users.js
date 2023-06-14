// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email.'),
  body('email').custom(async value => {
      const existingEmail = await User.findAll({
        attributes: ["email"]
      })
      for (let email of existingEmail) {
        if (value === email.email) {
          throw new Error ("User with that email already exists")
        }
      }
    }),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
    body('username').custom(async value => {
      const existingUsername = await User.findAll({
        attributes: ["username"]
      })
      for (let username of existingUsername) {
        if (value === username.username) {
          throw new Error ("User with that username already exists")
        }
      }
    }),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
    check("username")
    .exists({checkFalsy: true})
    .withMessage("Username is required"),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check("firstName")
    .exists({checkFalsy: true})
    .withMessage("First Name is required"),
  check("lastName")
    .exists({checkFalsy: true})
    .withMessage("Last Name is required"),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ firstName, lastName, email, username, hashedPassword });
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

module.exports = router;
