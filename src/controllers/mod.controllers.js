import createError from '../utils/create.error.util.js'
import fs from 'fs/promises'
import path from 'path'
import { getCommunityBy, getMemberInfo } from '../services/community.service.js'
import { getAllmembersInCommu } from '../services/mod.service.js'

export const getAllmembersInCommunity = async (req,res,next) => {
    const communityName = req.params.communityname
        console.log(communityName)
        const commuinfo = await getCommunityBy('communityname', communityName)
        if (!commuinfo) {
           createError(404,"Community is not found")
        }
     const { id } = req.user;  
     const memberinfo = await getMemberInfo(id, commuinfo.id)
    if(!memberinfo||memberinfo?.role!="ADMIN")
    {
        createError(403,"Your Role cannot accese")
    }
    const result = await getAllmembersInCommu(commuinfo.id)
    console.log(result)
    res.json({members:result})
}