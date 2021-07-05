const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken");

const sequelize = new Sequelize(dbConfig);

User.init(sequelize);
VerificationToken.init(sequelize);

VerificationToken.associate(sequelize.models);

module.exports = sequelize;
