const User = require("../models/User");
const { hash } = require("bcryptjs");

class UsersRepository {
  async findById(id) {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({ where: { email: email } });

    return user;
  }

  async save(user) {
    const passwordHash = await hash(user["password"], 8);

    const new_user = await User.create({
      name: user["name"],
      email: user["email"],
      password: passwordHash,
      verified: false,
    });

    return new_user;
  }

  async update(user) {
    const passwordHash = await hash(user["password"], 8);

    await User.update(
      {
        name: user["name"],
        email: user["email"],
        password: passwordHash,
      },
      {
        where: {
          id: user["id"],
        },
      }
    );
  }

  async destroy(id) {
    await User.destroy({
      where: {
        id: id,
      },
    });
  }
}

module.exports = UsersRepository;
