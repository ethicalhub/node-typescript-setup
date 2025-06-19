import { logger } from '@/lib/winston'
// import config from '@/config/config'

import { Request, Response } from 'express'
import User from '@/model/user'
import { genUserName } from '@/utils'
import { IUser } from '@/types'

const register = async (req: Request, res: Response): Promise<void> => {
    const { password, email, role }: IUser = req.body
    const username = genUserName()
    const newUser = await User.create({
        username: username,
        email: email,
        role: role || 'user',
        password: password // Ensure password is included in the request body
    })

    console.log('Registering user:', username, email, role)
    try {
        res.status(201).json({
            status: 'success',
            user: {
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            },
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
