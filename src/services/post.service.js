import prisma from "../config/prisma.config";

export const createNewpost = async (data) => {
	return await prisma.post.create({ data: data })
}
