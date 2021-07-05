const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const RefreshToken = require("../models/RefreshToken");

const sequelize = new Sequelize(dbConfig);

User.init(sequelize);
VerificationToken.init(sequelize);
RefreshToken.init(sequelize);

VerificationToken.associate(sequelize.models);
RefreshToken.associate(sequelize.models);

module.exports = sequelize;
