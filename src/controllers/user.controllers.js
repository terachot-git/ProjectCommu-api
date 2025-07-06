import cloudinary from '../config/cloudinary.config.js';
import prisma from '../config/prisma.config.js';
import { getCommunityByUser, getUserBy } from '../services/user.service.js';
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

export const createCommunity = async (req, res, next) => {
	try {
		const { communityname, communitydetail, membersname } = req.body;
		const { id: userId } = req.user;
		const files = req.files;

		const existingCommunity = await getCommunityBy('communityname', communityname)


		if (existingCommunity) {
			createError(409, "This community name is already taken.")
		}

		const [iconResult, bannerResult, memberImageResult] = await Promise.all([
			files.communityIcon ? cloudinary.uploader.upload(files.communityIcon[0].path) : Promise.resolve(null),
			files.communityBanner ? cloudinary.uploader.upload(files.communityBanner[0].path) : Promise.resolve(null),
			files.membersImage ? cloudinary.uploader.upload(files.membersImage[0].path) : Promise.resolve(null)
		]);

		await Promise.all([
			files.communityIcon ? fs.unlink(files.communityIcon[0].path) : Promise.resolve(),
			files.communityBanner ? fs.unlink(files.communityBanner[0].path) : Promise.resolve(),
			files.membersImage ? fs.unlink(files.membersImage[0].path) : Promise.resolve()
		]);


		const newCommunity = await prisma.community.create({
			data: {
				communityname: communityname,
				communitydetail: communitydetail,
				communityIcon: iconResult?.secure_url,
				communityBanner: bannerResult?.secure_url,
				membersname: membersname,
				membersImage: memberImageResult?.memberImageResult
			}
		});


		if (newCommunity) {
			await prisma.communityMember.create({
				data: {
					communityId: newCommunity.id,
					userId: userId,
					role: 'ADMIN',
					joinOrder: 1
				}
			});
		}

		res.status(201).json({ message: "Community created successfully!", community: newCommunity });

	} catch (error) {
		next(error);
	}
}

export const getAllCommunity = async (req, res, next) => {
    try {
       {
        const { id } = req.user;
        const commuinfo = await getCommunityByUser(id)
		res.status(200).json({
		commu: commuinfo
	})
       }
    } catch (error) {
        next(error);
    }
}