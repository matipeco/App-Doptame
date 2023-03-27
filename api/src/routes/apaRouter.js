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
const { verifyToken, isApaOrAdmin } = require("../middlewares/authJwt");
//jwt
apaRouter.post("/auth", authApaRouter.signUpApa);
// apaRouter.post("/auth/login", authApaRouter.signIn);
apaRouter.post("/auth/changePassword", authApaRouter.resetPasswordWithEmail);
apaRouter.post("/auth/forgotPassword", authApaRouter.forgotPassword);
////////////

apaRouter.put("/:id", putApaHandler);

apaRouter.get("/:id", getApaByIdHandler);

apaRouter.get("/", getAllApasHandler); // Diego: Nuevo

apaRouter.delete("/:id", [verifyToken, isApaOrAdmin], deleteApaByIdHandler); // Diego: Nuevo

module.exports = apaRouter;
