
import app from './app.js'
import shutdown from './utils/shutdown.util.js'



const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>console.log(`Server on :  http://localhost:${PORT}`))

process.on("SIGINT", ()=>	shutdown('SIGINT'))
process.on("SIGTERM", ()=>	shutdown('SIGTERM'))

process.on("uncaughtException", ()=>	shutdown('uncaughtException'))
process.on("unhandledRejection", ()=>	shutdown('unhandledRejection'))