const VerificationToken = require("../models/VerificationToken");
const User = require("../models/User");

module.exports = {
  async verification(req, res) {
    const token = req.params.token;

    const query = await VerificationToken.findAll({
      limit: 1,
      where: { token: token },
    });

    vt = query[0]["dataValues"];
    await User.update(
      { verified: true },
      {
        where: {
          id: vt["user_id"],
        },
      }
    );

    return res.status(200).send({ message: "Verificated user!" });
  },
};
