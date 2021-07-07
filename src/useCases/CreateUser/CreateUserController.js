const CreateUserUseCase = require("./CreateUserUseCase");

module.exports = {
  async handle(req, res) {
    const { name, email, password } = req.body;

    const createUserUseCase = new CreateUserUseCase();

    try {
      const user = await createUserUseCase.execute({
        name: name,
        email: email,
        password: password,
        verified: false,
      });

      return res.status(200).send(user);
    } catch (err) {
      return res
        .status(400)
        .json({ message: err.message || "Unexpected error" });
    }
  },
};
