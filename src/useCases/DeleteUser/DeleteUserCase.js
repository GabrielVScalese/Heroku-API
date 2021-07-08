const UsersRepository = require("../../repositories/UsersRepository");

class DeleteUserCase {
  async execute(id) {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if (!user) throw new Error("Nonexistent user");

    await usersRepository.destroy(id);
  }
}

module.exports = DeleteUserCase;
