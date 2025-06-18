import mongoose from 'mongoose'
import config from '@/config/config'

import { ConnectOptions } from 'mongoose'

const clientOptions: ConnectOptions = {
    dbName: '0xCoders_db',
    appName: '0xCoders',
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
}

export const connectDb = async () => {
    if (!config.MONGO_URI) {
        throw new Error('MONGO_URI is not defined in the environment variables')
    }
    try {
        await mongoose.connect(config.MONGO_URI, clientOptions)
        console.log('MongoDB connected successfully', {
            uri: config.MONGO_URI,
            clientOptions: clientOptions
        })
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        if (error instanceof mongoose.Error) {
            throw error
        }
    }
}

export const disconnectDb = async () => {
    try {
        await mongoose.disconnect()
        console.log('MongoDB disconnected successfully', {
            uri: config.MONGO_URI,
            clientOptions: clientOptions
        })
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error)
        if (error instanceof mongoose.Error) {
            throw error
        }
    }
}
