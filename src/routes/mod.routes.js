import express from "express";
import { authCheck} from "../middlewares/auth.middleware.js";
import * as modcontroller from "../controllers/mod.controllers.js"

const modRoute = express.Router()
modRoute.get("/members/:communityname",authCheck,modcontroller.getAllmembersInCommunity)
export default modRoute