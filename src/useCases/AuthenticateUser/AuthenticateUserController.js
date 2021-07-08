const AuthenticateUserCase = require("./AuthenticateUserCase");

module.exports = {
  async handle(req, res) {
    const { email, password } = req.body;

    const authenticateUserCase = new AuthenticateUserCase();

    try {
      const result = await authenticateUserCase.execute({ email, password });

      console.log(req.id);
      return res.status(200).json(result);
    } catch (err) {
      return res
        .status(400)
        .json({ message: err.message || "Unexpected error" });
    }
  },
};
