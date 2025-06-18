import dotenv from 'dotenv'
import process from 'process'
dotenv.config()

// Ensure Node.js types are available
// If using TypeScript, install @types/node and ensure tsconfig includes "node" in types

const config = {
    PORT: process.env.PORT || 3001,
    NODE_ENV: process.env.NODE_ENV,
    WHITELIST_ORIGINS: ['http://localhost:3001', 'https://example.com'],
    MONGO_URI: process.env.MONGO_URI,
    LOG_LEVEL: process.env.LOG_LEVEL || 'info'
}

export default config
