const { Router } = require("express");
const apaRouter = Router();
const {
  createApaHandler,
  putApaHandler,
  getApaByIdHandler,
  getAllApasHandler,
  deleteApaByIdHandler,
} = require("../handlers/apaHandler");
const authApaRouter = require("../controllers/authApa");
const { verifyToken, isApa, isAdmin } = require("../middlewares/authJwt");
//jwt
apaRouter.post("/auth", authApaRouter.signUpApa);
// apaRouter.post("/auth/login", authApaRouter.signIn);
apaRouter.post("/auth/changePassword", authApaRouter.resetPasswordWithEmail);
apaRouter.post("/auth/forgotPassword", authApaRouter.forgotPassword);
////////////

apaRouter.put("/:id", [verifyToken, isApa, isAdmin], putApaHandler);

apaRouter.get("/:id", getApaByIdHandler);

apaRouter.get("/", getAllApasHandler); // Diego: Nuevo

apaRouter.delete("/:id", [verifyToken, isApa, isAdmin], deleteApaByIdHandler); // Diego: Nuevo

module.exports = apaRouter;
