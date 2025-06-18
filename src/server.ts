import express from 'express'
import cors, { CorsOptions } from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import compression from 'compression'
import limiter from '@/lib/express_rate_limit'
import { logger } from '@/lib/winston'

// custom module imports
import config from '@/config/config'
import { connectDb, disconnectDb } from './lib/mongoose'

// router imports
import v1router from '@/routes/v1'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet())
app.use(
    compression({
        threshold: 1024 // Compress responses larger than 1KB
    })
)
app.use(limiter) // Apply rate limiting middleware
const CorsOptions: CorsOptions = {
    origin(origin, callback) {
        if (
            config.NODE_ENV === 'development' ||
            !origin ||
            config.WHITELIST_ORIGINS.includes(origin)
        ) {
            // Allow requests from whitelisted origins or no origin (e.g., Postman)
            callback(null, true)
        } else {
            // Reject requests from non-whitelisted origins
            callback(new Error(`CORS Error: ${origin} is not allowed by CORS policy`), false)
            logger.warn(`CORS Error: ${origin} is not allowed by CORS policy`)
        }
    }
}
app.use(cors(CorsOptions))
;(async () => {
    try {
        await connectDb()
        app.use('/api/v1', v1router)
        app.listen(config.PORT, () => {
            logger.info(`Server is running on http://localhost:${config.PORT}`)
        })
    } catch (error) {
        logger.error('Error starting the server:', error)
        if (config.NODE_ENV === 'production') {
            process.exit(1)
        }
    }
})()

const handleServerShutdown = async () => {
    try {
        await disconnectDb()
        logger.warn('Server is shutting down...')
        process.exit(0)
    } catch (error) {
        logger.error('Error during server shutdown:', error)
        process.exit(1)
    }
}
process.on('SIGINT', handleServerShutdown)
process.on('SIGTERM', handleServerShutdown)
