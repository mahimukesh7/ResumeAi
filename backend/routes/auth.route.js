const {Router}= require("express")
const authController = require("../controllers/auth.controller")
const authRouter = Router()
const authMiddleware = require("../src/middleware/auth.middleware")






authRouter.post("/register",authController.registerusercontroller)
authRouter.post("/login", authController.loginUserController)
authRouter.get("/logout", authController.logoutUserController)
authRouter.get("/getme", authMiddleware.authUser,authController.getMecontroller)



module.exports = authRouter