import express from 'express'
import cors from 'cors'
const app = express()
import authRoute from './routes/auth.routes.js'
import errorMiddleware from './middlewares/error.middleware.js'
import notfoundMiddleware from './middlewares/notfound.middleware.js'
import userRoute from './routes/user.routes.js'
import communityRoute from './routes/community.routes.js'
app.use(cors({
	origin : 'http://localhost:5173'
}))
app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/community",communityRoute)
app.use( errorMiddleware )
app.use( notfoundMiddleware)
export default app