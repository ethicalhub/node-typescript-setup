import { logger } from '@/lib/winston'
// import config from '@/config/config'

import { Request, Response } from 'express'

const register = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(201).json({
            message: 'User registered successfully'
        })
    } catch (error) {
        logger.error(`Error in registerUser: ${error}`)
        res.status(500).json({
            message: 'Internal Server Error',
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
        })
    }
}

export default register
