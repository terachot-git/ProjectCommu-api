import prisma from "../config/prisma.config.js";

export const createNewpost = async (data) => {
	return await prisma.post.create({ data: data })
}

export const updatePost = async (postid,data) => {
	return await prisma.post.update({where:{id:postid}, data: data })
}