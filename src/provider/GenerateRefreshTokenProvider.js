const dayjs = require("dayjs");
const RefreshToken = require("../models/RefreshToken");

class GenerateRefreshToken {
  async execute(userId) {
    const expiresIn = dayjs().add(15, "second").unix();
    const refreshToken = await RefreshToken.create({
      user_id: userId,
      expires_in: expiresIn,
    });

    return refreshToken;
  }
}

module.exports = GenerateRefreshToken;
