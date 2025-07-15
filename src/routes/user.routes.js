import express from "express";
import { authCheck } from "../middlewares/auth.middleware.js";
import * as userController from "../controllers/user.controllers.js"
import   { createCommunityUpload, singleUpload } from "../middlewares/upload.middleware.js";
 "../middlewares/upload.middleware.js";
const userRoute = express.Router()
userRoute.get("/me",authCheck,userController.getMe)
userRoute.patch("/me",authCheck,singleUpload,userController.updateProfile)
userRoute.get("/community",authCheck,userController.getAllCommunity)
userRoute.post("/community",authCheck,createCommunityUpload,userController.createCommunity)
userRoute.post("/community/:communityname",authCheck,userController.joinCommunity)
userRoute.delete("/community/:communityname",authCheck,userController.leaveCommunity)
userRoute.post("/posts/:communityid",authCheck,singleUpload,userController.createPost)
userRoute.get("/posts/community",authCheck,userController.getAllpostForHome)
export default userRoute