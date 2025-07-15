import createError from '../utils/create.error.util.js'
import fs from 'fs/promises'
import path from 'path'
import { getAllPostInCommunity, getCommunityBy, getMemberInfo, searchcommunity } from '../services/community.service.js';
export const getCommunity = async (req, res, next) => {
    try {
        const communityName = req.params.communityname
        // console.log(communityName)
        let community = null
        const commuinfo = await getCommunityBy('communityname', communityName)
        if (commuinfo) {
            community = commuinfo
        }

        let memberrole = 'GUEST';
        let member = null
        if (!!req.user && commuinfo) {
            const { id } = req.user;
            const memberinfo = await getMemberInfo(id, commuinfo.id)
            if (memberinfo) {
                const { role, joinedAt, updatedAt, userId, communityId, user, ...userdata } = memberinfo
                memberrole = memberinfo.role
                member = userdata
            }

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

export const getAllPost = async (req, res, next) => {
    try {
        const communityname = req.params.communityname
        const { poststatus } = req.query
        const checkcommu = await getCommunityBy("communityname", communityname)
        if (!checkcommu) {
            createError(404, "Community is not found")
        }
        const allpost = await getAllPostInCommunity(Number(checkcommu.id), poststatus)


        res.json({
            posts: allpost
        })
    } catch (error) {
        next(error);
    }
}

export const search = async (req, res, next) => {
    try {
        const { q } = req.query;
        // console.log(q)
        if (!q || typeof q !== 'string') {
            return res.status(200).json([]);
        }
        const community = await searchcommunity(q)
        return res.status(200).json(community);
    } catch (error) {
           next(error)
    }

}

