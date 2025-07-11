import express, { Request, Response } from 'express'
import cors from 'cors'
import { router } from './app/routes'
import { globalErrorHandler } from './app/middlewares/globalErrorHandle'
import notFound from './app/middlewares/notFound'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1', router)

app.get('/', (req: Request, res:Response)=>{
    res.status(200).json({
        message: 'welcome to the PH tour server'
    })
})

app.use(globalErrorHandler)

app.use(notFound)

export default app