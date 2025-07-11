import express from "express";
import { authCheck, authCheckInCommu } from "../middlewares/auth.middleware.js";
import * as communityController from "../controllers/community.controllers.js"

const communityRoute = express.Router()
communityRoute.get("/:communityname",authCheckInCommu,communityController.getCommunity)
communityRoute.get("/posts/:communityname",communityController.getAllPost)
export default communityRoute