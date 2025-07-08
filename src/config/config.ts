import dotenv from 'dotenv'
import process from 'process'
dotenv.config()

import ms from 'ms'

// Ensure Node.js types are available
// If using TypeScript, install @types/node and ensure tsconfig includes "node" in types

const config = {
    PORT: process.env.PORT || 3001,
    NODE_ENV: process.env.NODE_ENV,
    WHITELIST_ORIGINS: ['http://localhost:3001', 'https://www.0xCoders.com'],
    MONGO_URI: process.env.MONGO_URI,
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY as ms.StringValue,
    JWT_REFRESH_EXPIRATION_DAYS: process.env.JWT_REFRESH_EXPIRATION_DAYS as ms.StringValue,
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS || '10', 10)
}

export default config
