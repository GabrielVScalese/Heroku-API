const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const nodemailer = require("nodemailer");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const GenerateRefreshTokenProvider = require("../provider/GenerateRefreshTokenProvider");
const GenerateTokenProvider = require("../provider/GenerateTokenProvider");
const RefreshToken = require("../models/RefreshToken");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { name, email, password } = req.body;
    const passwordHash = await hash(password, 8);

    const user = await User.create({
      name,
      email,
      password: passwordHash,
      verified: false,
    });

    // Generate token
    const token = sign({}, process.env.SECRET_KEY, {
      subject: user["id"].toString(),
      expiresIn: "5m",
    });

    await VerificationToken.create({
      user_id: user["id"],
      token: token,
    });

    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "From Test",
      to: email,
      subject: "Email Confirmation",
      html: `Press <a href=https://heroku-sequelize-api.herokuapp.com/api/verifyUser/${token}> Here </a> to verify your email`,
    };

    transport.sendMail(mailOptions);

    return res.json(user);
  },

  async authenticate(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    const passwordMatch = await compare(password, user["password"]);

    if (!passwordMatch)
      return res.status(401).send({ message: "Unauthorized user!" });

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(user["id"]);

    await RefreshToken.destroy({
      where: {
        user_id: user["id"],
      },
    });

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
    const refreshToken = await generateRefreshTokenProvider.execute(user["id"]);

    return res.json({ token, refreshToken });
  },
};
