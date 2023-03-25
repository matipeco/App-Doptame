const { Router } = require("express");
const userRouter = Router();

const {
  createUser,
  getUserById,
  putUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");
const { verifyToken, isUser, isAdmin } = require("../middlewares/authJwt");

// userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", [verifyToken, isUser, isAdmin], putUser);
userRouter.delete("/:id", [verifyToken, isUser, isAdmin], deleteUser);

module.exports = userRouter;
