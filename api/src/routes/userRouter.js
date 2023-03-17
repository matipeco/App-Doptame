const { Router } = require("express");
const userRouter = Router();
const { createUser, getUserById, putUser, getAllUsers, deleteUser } = require("../controllers/userController");

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers)
userRouter.get("/:id", getUserById);
userRouter.put("/:id", putUser);
userRouter.delete("/:id", deleteUser)

module.exports = userRouter;
