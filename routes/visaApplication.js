const express = require("express");
const VisaApplication = require("../models/VisaApplication");
const auth = require("../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");

//@route    POST api/visa_applications
//@desc     apply visa
//@access   Private

router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.array() });
  }

  const {
    appId,
    firstName,
    lastName,
    destination,
    passportNumber,
    status
  } = req.body;

  try {
    const newApplication = new VisaApplication({
      appId: appId,
      firstName: firstName,
      lastName: lastName,
      destination: destination,
      passportNumber: passportNumber,
      status: status,
      user: req.user.id
    });

    const filter = { appId: appId };
    const update = newApplication;

    let application = await VisaApplication.findOne(filter);

    if (application === null) {
      application = await newApplication.save();
      res.json(application);
    } else {
      application = await VisaApplication.findOne(filter, (err, doc) => {
        doc.firstName = firstName;
        doc.lastName = lastName;
        doc.destination = destination;
        doc.passportNumber = passportNumber;
        doc.status = status;
        doc.save();
        res.json(doc);
      });
    }

    // const application = await newApplication.save();

    // res.json(application);
    // const checkApp = await VisaApplication.findOne({
    //   applicationId: "1321"
    // });
    // if (checkApp === null) {
    //   const application = await newApplication.save();
    // } else {
    //   res.json(checkApp);
    // }
  } catch (e) {
    console.error(e.message);
    res.status(500).send(e.message);
  }
});

module.exports = router;
