const UsersRepository = require("../../repositories/UsersRepository");

class UpdateUserCase {
  async execute(data) {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(data["id"]);

    if (!user) throw new Error("Nonexistent user");

    await usersRepository.update(data);
  }
}

module.exports = UpdateUserCase;
