import express from 'express'
import cors, { CorsOptions } from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import compression from 'compression'
import limiter from '@/lib/express_rate_limit'

// custom module imports
import config from '@/config/config'
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
        }
    }
}
app.use(cors(CorsOptions))
;(async () => {
    try {
        app.get('/', (req, res) => {
            res.send({
                message: 'Hello, World!'
            })
        })

        app.listen(config.PORT, () => {
            // console.log(`Server is running on http://localhost:${config.PORT}`)
        })
    } catch (error) {
        console.error('Error starting the server:', error)
        if (config.NODE_ENV === 'production') {
            process.exit(1)
        }
    }
})()
