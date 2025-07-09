import express, { Request, Response } from 'express'
import cors from 'cors'
import { userRoute } from './app/modules/user/user.route'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/vi/user', userRoute)

app.get('/', (req: Request, res:Response)=>{
    res.status(200).json({
        message: 'welcome to the PH tour server'
    })
})

export default app