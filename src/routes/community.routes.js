import express from "express";
import { authCheckInCommu } from "../middlewares/auth.middleware.js";
import * as communityController from "../controllers/community.controllers.js"

const communityRoute = express.Router()
communityRoute.get("/:communityname",authCheckInCommu,communityController.getCommunity)

export default communityRoute