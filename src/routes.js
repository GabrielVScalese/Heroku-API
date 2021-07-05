const express = require("express");
const UserController = require("./controllers/UserController");
const VerificationTokenController = require("./controllers/VerificationTokenController");
const RefreshTokenController = require("./controllers/RefreshTokenController");
const { ensureAuthenticated } = require("./middlewares/ensureAuthenticated");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

// Users
routes.get("/api/users", UserController.index);
routes.post("/api/insertUser", UserController.store);
routes.post("/api/authenticateUser", UserController.authenticate);

// VerificationToken
routes.get("/api/verifyUser/:token", VerificationTokenController.verification);

// RefreshToken
routes.post("/api/refresh-token", RefreshTokenController.handle);

// Test
routes.get("/api/courses", ensureAuthenticated, (req, res) => {
  return res.json([
    { id: 1, name: "NodeJS" },
    { id: 2, name: "Fluter" },
  ]);
});

module.exports = routes;
