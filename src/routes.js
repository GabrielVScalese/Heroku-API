const express = require("express");
const UserController = require("./controllers/UserController");
const VerificationTokenController = require("./controllers/VerificationTokenController");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

// Users
routes.get("/api/users", UserController.index);
routes.post("/api/insertUser", UserController.store);

// VerificationToken
routes.get("/api/verifyUser/:token", VerificationTokenController.verification);

module.exports = routes;
