import prisma from "../config/prisma.config.js";

export const createNewpost = async (data) => {
	return await prisma.post.create({ data: data })
}

export const updatePost = async (postid,data) => {
	return await prisma.post.update({where:{id:postid}, data: data })
}
export const servicedeletePost = async (postid) => {
	return await prisma.post.delete({where:{id:postid}})
}
export const getPost = async (postid) => {
	return await prisma.post.findUnique({where:{id:postid}})
}