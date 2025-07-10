import prisma from "../config/prisma.config.js"
export const getAllmembersInCommu = async (id) => {
    return await prisma.communityMember.findMany({
        where: {
            communityId: id,
        },
         orderBy: {
            joinOrder: 'asc',
        },
        include: {
            user:  { 
                select: { 
                    username: true,
                    profileImage: true,
                }
            }
        },
    });
}
export const updateMember = async (memberid,commuId,newdata) => {
    return await prisma.communityMember.update({
        where: {
            userId_communityId: { 
                userId: memberid,
                communityId: commuId,
            }
            , 
       
        },
        data:newdata
        },
    )
   
};

export const deleteMember = async (memberid,commuId) => {
    return await prisma.communityMember.delete({
			where: {
				userId_communityId: {
					userId: memberid,
					communityId: commuId,
				},
			},
		});
};

