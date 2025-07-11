import express from "express";
import { authCheck} from "../middlewares/auth.middleware.js";
import * as modcontroller from "../controllers/mod.controllers.js"

const modRoute = express.Router()
modRoute.get("/members/:communityname",authCheck,modcontroller.getAllmembersInCommunity)
modRoute.delete("/members/:communityname",authCheck,modcontroller.deleteMembersInCommunity)
modRoute.patch("/members/:communityname",authCheck,modcontroller.updateRoleMembers)
modRoute.patch("/posts/:communityname",authCheck,modcontroller.updatePostStatus)
export default modRoute