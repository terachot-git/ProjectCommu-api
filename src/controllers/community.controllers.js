import createError from '../utils/create.error.util.js'
import fs from 'fs/promises'
import path from 'path'
import { getCommunityBy, getMemberInfo } from '../services/community.service.js';
export const getCommunity = async (req, res, next) => {
    try {
        const  communityName  = req.params.communityname
        // console.log(communityName)
        let community = null
        const commuinfo = await getCommunityBy('communityname', communityName)
        if (commuinfo)
        {
           community = commuinfo
        }
        
        let memberrole = 'GUEST';
        let member=null
        if (!!req.user) {
        const { id } = req.user;
         const memberinfo =  await getMemberInfo(id,commuinfo.id)
         const {role,joinedAt,updatedAt,userId,communityId,user,...userdata} = memberinfo
         memberrole = memberinfo.role
         member = userdata
        }
        res.json({
            memberrole,
            member,
            community
            
        })
    } catch (error) {
        next(error);
    }
}

