const { sign } = require("jsonwebtoken");

class GenerateTokenProvider {
  async execute(userId) {
    const token = sign({}, process.env.SECRET_KEY, {
      subject: userId.toString(),
      expiresIn: "20s",
    });

    return token;
  }
}

module.exports = GenerateTokenProvider;
