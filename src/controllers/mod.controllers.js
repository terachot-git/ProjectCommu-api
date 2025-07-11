import createError from '../utils/create.error.util.js'
import fs from 'fs/promises'
import path from 'path'
import { getCommunityBy, getMemberInfo } from '../services/community.service.js'
import { deleteMember, getAllmembersInCommu, updateMember } from '../services/mod.service.js'
import { updatePost } from '../services/post.service.js'

export const getAllmembersInCommunity = async (req,res,next) => {
    const communityName = req.params.communityname
        // console.log(communityName)
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
    // console.log(result)
    res.json({members:result})
}

export const deleteMembersInCommunity = async (req,res,next) => {
    const communityName = req.params.communityname
        console.log(communityName)
        const commuinfo = await getCommunityBy('communityname', communityName)
        if (!commuinfo) {
           createError(404,"Community is not found")
        }
     const { id } = req.user;  
     const { memberid } = req.body;  
     const memberinfo = await getMemberInfo(id, commuinfo.id)
     
    if(!memberinfo||memberinfo?.role!="ADMIN")
    {
        createError(403,"Your Role cannot accese")
    }
     deleteMember(memberid,commuinfo.id)
    res.json({message:"Delete member done"})
}

export const updateRoleMembers = async (req,res,next) => {
    const communityName = req.params.communityname
        // console.log(communityName)
        const commuinfo = await getCommunityBy('communityname', communityName)
        if (!commuinfo) {
           createError(404,"Community is not found")
        }
     const { id } = req.user;  
     const { memberid ,role} = req.body;  
     const newdata = {role:role}
     
     const memberinfo = await getMemberInfo(id, commuinfo.id)
     
    if(!memberinfo||memberinfo?.role!="ADMIN")
    {
        createError(403,"Your Role cannot accese")
    }
     await updateMember(memberid,commuinfo.id,newdata)
    res.json({message:"Update member done"})
}

export const updatePostStatus = async (req,res,next) => {
    const communityName = req.params.communityname
        // console.log(communityName)
        const { id } = req.user;  
        const commuinfo = await getCommunityBy('communityname', communityName)
        if (!commuinfo) {
           createError(404,"Community is not found")
        }
      
     const memberinfo = await getMemberInfo(id, commuinfo.id)
     
    if(!memberinfo||memberinfo?.role!="ADMIN")
    {
        createError(403,"Your Role cannot accese")
    }
     const {poststatus,postid}=req.body
     console.log(poststatus)
     console.log(postid)
     if (!poststatus||!postid){
        createError(400,"Update fail")
     }
     const data = {
        poststatus:poststatus
     }
     await updatePost(postid,data)
    res.json({message:"Update status done"})
}


