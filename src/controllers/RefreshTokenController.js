const RefreshToken = require("../models/RefreshToken");
const GenerateTokenProvider = require("../provider/GenerateTokenProvider");
const GenerateRefreshTokenProvider = require("../provider/GenerateRefreshTokenProvider");
const dayjs = require("dayjs");

module.exports = {
  async handle(req, res) {
    const { refreshTokenId } = req.body;

    const refreshToken = await RefreshToken.findOne({
      where: {
        id: refreshTokenId,
      },
    });

    if (!refreshToken)
      return res.status(401).send({ message: "Invalid refresh token!" });

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken["user_id"]);

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken["expires_in"])
    );

    if (refreshTokenExpired) {
      await RefreshToken.destroy({
        where: { user_id: refreshToken["user_id"] },
      });

      const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
      const newRefreshToken = await generateRefreshTokenProvider.execute(
        refreshToken["user_id"]
      );

      return res.json({ token, refreshToken: newRefreshToken });
    }

    return res.json({ token });
  },
};
