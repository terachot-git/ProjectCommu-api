import prisma from "../config/prisma.config.js";

export const getCommunityBy = async (column, value) => {
    return await prisma.community.findUnique({
        where: { [column]: value }
    })
}

export const createCommunity = async (Data) => {
    return await prisma.community.create({ data: Data })
}

export const getmembersInCommu = async (id) => {
    return await prisma.communityMember.findMany({
        where: {
            communityId: id,
        },
        include: {
            user: true,

        },
    });
}

export const createMembers = async (Data) => {
    return await prisma.communityMember.create({ data: Data })
}

export const getMemberInfo = async (userid, commuID) => {
    return await prisma.communityMember.findUnique({
        where: {
               userId_communityId: { 
                userId: userid,
                communityId: commuID,
            }
        },
        include: {
          user: { 
                select: { 
                    username: true,
                    profileImage: true,
                }
            }

        },
    });
}