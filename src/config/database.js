require("dotenv").config();

module.exports = {
  dialect: "postgres",
  host: process.env.HOST,
  username: process.env.USERNAME_DATABASE,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  define: { timestamps: true, underscored: true },
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
