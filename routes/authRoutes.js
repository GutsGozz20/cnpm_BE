const authController = require("../controller/authController");

const authRouter = require("express").Router()

authRouter.post("/register", authController.register)
authRouter.post("/login", authController.login)
authRouter.get("/getall-user", authController.getAllUser)
authRouter.get("/total-score", authController.totalScore)
// crud route
authRouter.post("/create-user", authController.createUser)
authRouter.get("/users/:userId", authController.readAllUser)
authRouter.put("/users/:userId", authController.updateUser)
authRouter.delete("/users/:userId", authController.deleteUser)

module.exports = authRouter;    