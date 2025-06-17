import dotenv from 'dotenv'
import process from 'process'
dotenv.config()

// Ensure Node.js types are available
// If using TypeScript, install @types/node and ensure tsconfig includes "node" in types

const config = {
    PORT: process.env.PORT || 3001,
    NODE_ENV: process.env.NODE_ENV,
    WHITELIST_ORIGINS: ['http://localhost:3001', 'https://example.com']
}

export default config
