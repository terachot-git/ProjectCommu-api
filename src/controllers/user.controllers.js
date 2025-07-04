import cloudinary from '../config/cloudinary.config.js';
import prisma from '../config/prisma.config.js';
import { getUserBy } from '../services/user.service.js';
import createError from '../utils/create.error.util.js'
import fs from 'fs/promises'
import path from 'path'
export const getMe = async (req, res, next) => {
	try {
		const { id } = req.user;

		const foundUser = await getUserBy('id', id)
		if (!foundUser) {
			createError(401, 'Invalid Login')
		}
		const { password, createdAt, updatedAt, ...userData } = foundUser

		res.json({
			user: userData
		})
	} catch (error) {
		next(error);
	}
};

export const updateProfile = async (req, res, next) => {
	// console.log(req.file)
	// console.log(req.user)
	let haveFile = !!req.file
	let uploadResult = null
	if (haveFile) {
		uploadResult = await cloudinary.uploader.upload(req.file.path, {
			overwrite: true,
			public_id: path.parse(req.file.path).name
		})
		fs.unlink(req.file.path)
	}
	const data = {
		profileImage: uploadResult?.secure_url || '',
	}

	const rs = await prisma.user.update({
		where: {
			id: req.user.id
		}, data
	})
	res.status(200).json({
		message: 'Update Profile done',
		result: rs
	})
}
