/* eslint-disable no-console */
import mongoose from 'mongoose'
import { Server } from 'http'
import app from './app'

let server: Server

const startServer = async () => {
    try {
        await mongoose.connect('mongodb+srv://nodeTodo:wFgUvqZsnwPhx5l5@cluster0.encxuwd.mongodb.net/ph-tour?retryWrites=true&w=majority&appName=Cluster0')
    console.log('connect DB')
    app.listen(5000, ()=>{
        console.log('serve is listening to port 5000')
    })
    } catch (error) {
        console.log(error)
    }
}

startServer()

process.on("SIGTERM", ()=>{
    console.log('SIGTERM signal... server shutting down')

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }

    process.exit(1)
})

process.on("SIGINT", ()=>{
    console.log('SIGTERM signal... server shutting down')

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }

    process.exit(1)
})

process.on("unhandledRejection", (err)=>{
    console.log('unhandled rejection... server shutting down', err)

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }

    process.exit(1)
})

process.on("uncaughtException", (err)=>{
    console.log('unhandled rejection... server shutting down', err)

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }

    process.exit(1)
})

// Promise.reject(new Error('unhandled rejection'))
// throw new Error('uncaught exception')