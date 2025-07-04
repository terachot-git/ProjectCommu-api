import multer from 'multer'
import path from 'path'

const dest = path.join(process.cwd(),'tmp-pic')
console.log(dest)
const storage = multer.diskStorage({
	destination : (req, file, cb) => cb(null, dest),
	filename : (req, file, cb) => {
		let fileExt = path.extname(file.originalname)
		let fileName = `pic_${Date.now()}_${Math.round(Math.random()*100)}${fileExt}`
		cb(null, fileName)
	}
}

)

export default multer({storage})