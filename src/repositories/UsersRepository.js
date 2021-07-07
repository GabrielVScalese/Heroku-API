const User = require("../models/User");

class UsersRepository {
  async findByEmail(email) {
    const user = await User.findOne({ where: { email: email } });

    return user;
  }

  async save(user) {
    const new_user = await User.create(user);

    return new_user;
  }
}

module.exports = UsersRepository;
