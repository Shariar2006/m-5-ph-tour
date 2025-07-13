/* eslint-disable no-console */
import mongoose from 'mongoose'
import { Server } from 'http'
import app from './app'
import { envVars } from './app/config/env'
import { seedSuperAdmin } from './app/utils/seedSuperAdmin'

let server: Server

const startServer = async () => {
    try {
        await mongoose.connect(envVars?.DB_URL)
        console.log('connect DB')
        app.listen(envVars.PORT, () => {
            console.log(`serve is listening to port ${envVars.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

(async () => {
    await startServer()
await seedSuperAdmin()
})()

process.on("SIGTERM", () => {
    console.log('SIGTERM signal... server shutting down')

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }

    process.exit(1)
})

process.on("SIGINT", () => {
    console.log('SIGTERM signal... server shutting down')

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }

    process.exit(1)
})

process.on("unhandledRejection", (err) => {
    console.log('unhandled rejection... server shutting down', err)

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }

    process.exit(1)
})

process.on("uncaughtException", (err) => {
    console.log('unhandled rejection... server shutting down', err)

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }

    process.exit(1)
})

// Promise.reject(new Error('unhandled rejection'))
// throw new Error('uncaught exception')