import { object, string, number, date, ref } from 'yup';
import createError from '../utils/create.error.util.js';

export const registerSchema = object({
	username: string().required().min(3),
	password: string().min(6).required(),
	confirmPassword: string().oneOf([ref("password")], `confirmPassword must match password`),
})
export const loginSchema = object({
	username: string().required(),
	password: string().min(6).required(),
})
export const createCommuSchema = object({
	communityname: string().required().min(3).max(25),
	commudetail: string(),
	membersname:string().required().min(3).max(25),
})




export const validate = (schema, options = {}) => {
	return async function (req, res, next) {
		try {
			const cleanBody = await schema.validate(req.body, { abortEarly: false, ...options })
			req.body = cleanBody
			next()
		} catch (err) {
			let errMsg = err.errors.join('|||')
			console.log(errMsg)
			createError(400, errMsg)
		}
	}
}

