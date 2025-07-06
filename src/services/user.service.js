import prisma from "../config/prisma.config.js"

export const getUserBy = async (column, value) => {
	return await prisma.user.findUnique({
		where: { [column]: value }
	})
}

export const createUser = async (userData) => {
	return await prisma.user.create({ data: userData })
}

export const getCommunityByUser = async (userid) => {
    return await prisma.communityMember.findMany({
        where: { userId: userid },
        select: { 
            role: true,
            joinOrder: true,
            community: {
                select: {
					id:true,
                    communityname: true,
                    communityIcon: true
                }
            }
        }
    })
}