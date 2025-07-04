import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/prisma.config.js'
import createError from '../utils/create.error.util.js'
import { createUser, getUserBy } from '../services/user.service.js'

export async function register(req, res,next) {
	console.log(req.body)
	try {
		const {username,password} = req.body
		// หา user
		
			let  foundUser= await getUserBy('username', username)
			if(foundUser) createError(409, `username : ${username}  already register`)
		

		const newUser = {
			username,
			password: await bcrypt.hash(password, 10)
		
		}
		
		await createUser(newUser)
		
		res.json({message: 'Register successful'})
	}catch(err) {
		next(err)
	}
}

export const login = async (req, res, next) => {
	const {username, password} = req.body
	

	const foundUser = await getUserBy('username', username)
	if(!foundUser) {
		createError(401, 'Invalid Login')
	}
	let passwordOk = await bcrypt.compare(password, foundUser.password)
	if(!passwordOk) {
		createError(401, 'Invalid Login')
	}
	
	const payload = { id: foundUser.id }
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		algorithm : 'HS256',
		expiresIn : '15d',
	})
	const { password : pw, createdAt, updatedAt, ...userData  } = foundUser

	res.json({
		message: 'Login successful',
		token: token,
		user: userData
	})
}