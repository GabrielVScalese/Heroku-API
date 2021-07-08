const UsersRepository = require("../../repositories/UsersRepository");
const { compare } = require("bcryptjs");
const TokenProvider = require("../../providers/TokenProvider");

class AuthenticateUserCase {
  async execute(data) {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByEmail(data["email"]);

    if (!user) throw new Error("Nonexistent user");

    const passwordMatch = await compare(data["password"], user["password"]);

    if (!passwordMatch) throw new Error("Invalid credentials");

    const tokenProvider = new TokenProvider();

    const token = tokenProvider.execute(user["id"]);
    user["password"] = undefined;

    return { user, token };
  }
}

module.exports = AuthenticateUserCase;
