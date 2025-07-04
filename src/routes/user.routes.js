import express from "express";
import { authCheck } from "../middlewares/auth.middleware.js";
import * as userController from "../controllers/user.controllers.js"
import upload from "../middlewares/upload.middleware.js";
const userRoute = express.Router()
userRoute.get("/me",authCheck,userController.getMe)
userRoute.patch("/me",authCheck,upload.single('image'),userController.updateProfile)
export default userRoute