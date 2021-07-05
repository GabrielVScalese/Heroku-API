const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { name, email } = req.body;

    const user = await User.create({ name, email, verified: false });

    // Generate token
    console.log(process.env.SECRET_KEY);
    const token = jwt.sign({ id: user["id"] }, process.env.SECRET_KEY, {
      expiresIn: 300,
    });
    await VerificationToken.create({ user_id: user["id"], token: token });

    var transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    var mailOptions = {
      from: "From Test",
      to: email,
      subject: "Email Confirmation",
      html: `Press <a href=http://localhost:5000/api/verifyUser/${token}> Here </a> to verify your email`,
    };

    transport.sendMail(mailOptions);

    return res.json(user);
  },
};
