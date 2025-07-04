import express from "express";
import * as authController from '../controllers/auth.controllers.js'
import { loginSchema,validate,registerSchema } from "../validations/validator.js";
const authRoute = express.Router()
authRoute.post("/register",validate(registerSchema),authController.register)
authRoute.post("/login",validate(loginSchema),authController.login)
export default authRoute