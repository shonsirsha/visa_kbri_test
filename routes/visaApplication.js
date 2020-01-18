const express = require("express");
const VisaApplication = require("../models/VisaApplication");
const auth = require("../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");

//@route    POST api/visa_applications
//@desc     apply visa
//@access   Private

router.post(
  "/",
  [
    auth,
    [
      check("firstName", "First fame is required")
        .not()
        .isEmpty(),
      check("lastName", "Last name is required")
        .not()
        .isEmpty(),
      check("destination", "Destination is required")
        .not()
        .isEmpty(),
      check("passportNumber", "Passport number is required")
        .not()
        .isEmpty(),
      check("status", "Status is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      destination,
      passportNumber,
      status
    } = req.body;

    try {
      const newApplication = new VisaApplication({
        firstName: firstName,
        lastName: lastName,
        destination: destination,
        passportNumber: passportNumber,
        status: status,
        user: req.user.id
      });

      const application = await newApplication.save();
      res.json(application);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
