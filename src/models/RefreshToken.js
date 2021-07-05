const { Model, DataTypes } = require("sequelize");

class RefreshToken extends Model {
  static init(sequelize) {
    super.init({ expires_in: DataTypes.INTEGER }, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = RefreshToken;
