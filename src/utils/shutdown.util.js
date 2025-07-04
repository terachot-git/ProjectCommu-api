import prisma from '../config/prisma.config.js'

export default async function(signal) {
	console.log(`\nReceive ${signal}, shutting down`)
	try{
		console.log('Prisma disconnect')
		await prisma.$disconnect()
	}catch(err) {
		console.log('Error when disconnect', err)
	}finally{
		process.exit(0)
	}
}