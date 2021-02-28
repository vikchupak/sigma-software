const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /auth/signup
router.post(
  "/signup",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is empty.")
      .isEmail()
      .withMessage("Email is not valid."),

    check("password")
      .exists()
      .withMessage("Passord is not reserved at all.")
      .not()
      .isEmpty()
      .withMessage("Pasword is empty.")
      .isLength({ min: 6 })
      .withMessage("Passord must have at least 6 characters."),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const emailFirstError = errors.array().find((error) => error.param === "email");
        const passwordFirstError = errors.array().find((error) => error.param === "password");

        const filteredErrors = [];

        if (emailFirstError) {
            filteredErrors.push(emailFirstError)
        }
        if (passwordFirstError) {
            filteredErrors.push(passwordFirstError)
        }

        return res.status(400).json({
          message: filteredErrors
            .map((error) => error.msg)
            .join(" "),
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "Such a user already exists." });
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({ email, password: hashedPassword });

      await user.save();

      const token = jwt.sign({ userId: user._id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.status(201).json({ token, userId: user._id });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Ooops, something went wrong. Please, try again." });
    }
  }
);

// /auth/login
router.post(
  "/login",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is empty.")
      .isEmail()
      .withMessage("Email is not valid."),

    check("password")
      .exists()
      .withMessage("Passord is not reserved at all.")
      .not()
      .isEmpty()
      .withMessage("Pasword is empty."),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const emailFirstError = errors.array().find((error) => error.param === "email");
        const passwordFirstError = errors.array().find((error) => error.param === "password");

        const filteredErrors = [];

        if (emailFirstError) {
            filteredErrors.push(emailFirstError)
        }
        if (passwordFirstError) {
            filteredErrors.push(passwordFirstError)
        }

        return res.status(400).json({
          message: filteredErrors
            .map((error) => error.msg)
            .join(" "),
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "No such a user found." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Password is wrong." });
      }

      const token = jwt.sign({ userId: user._id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user._id });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Ooops, something went wrong. Please, try again." });
    }
  }
);

module.exports = router;
