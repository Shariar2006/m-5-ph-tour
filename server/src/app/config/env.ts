import dotenv from 'dotenv'

dotenv.config()

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: string,
    BCRYPT_sALT: string,
    JWT_ACCESS_EXPIRE: string,
    JWT_ACCESS_SECRET: string,
    SUPER_ADMIN_PASSWORD: string,
    SUPER_ADMIN_EMAIL: string,
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ['PORt', 'DB_URL', 'NODE_ENV', 'JWT_ACCESS_SECRET', 'BCRYPT_sALT', 'JWT_ACCESS_EXPIRE', 'SUPER_ADMIN_EMAIL', 'SUPER_ADMIN_PASSWORD']

    requiredEnvVariables?.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variable ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        NODE_ENV: process.env.NODE_ENV as string,
        JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        BCRYPT_sALT: process.env.BCRYPT_sALT as string,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    }
}

export const envVars = loadEnvVariables()