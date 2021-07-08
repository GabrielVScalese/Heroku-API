const express = require("express");
const CreateUserController = require("./useCases/CreateUser/CreateUserController");
const AuthenticateUserController = require("./useCases/AuthenticateUser/AuthenticateUserController");
const UpdateUserController = require("./useCases/UpdateUser/UpdateUserController");
const DeleteUserController = require("./useCases/DeleteUser/DeleteUserController");
const { ensureAuthenticated } = require("./middlewares/ensureAuthenticated");

const routes = express.Router();

routes.post("/users", CreateUserController.handle);
routes.put("/users/:id", ensureAuthenticated, UpdateUserController.handle);
routes.delete("/users/:id", ensureAuthenticated, DeleteUserController.handle);
routes.post("/auth", AuthenticateUserController.handle);

routes.get("/courses", ensureAuthenticated, (req, res) => {
  res.json([
    { id: 1, name: "NodeJS" },
    { id: 2, name: "Flutter" },
    { userId: req.id },
  ]);
});

module.exports = routes;
