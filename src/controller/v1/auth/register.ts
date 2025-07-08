import { logger } from '@/lib/winston'
// import config from '@/config/config'

import { Request, Response } from 'express'
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt'
import User from '@/model/user'
import { genUserName } from '@/utils'
import Token from '@/model/token'
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

    const accessToken = generateAccessToken(newUser._id)
    const refreshToken = generateRefreshToken(newUser._id)

    await Token.create({
        token: refreshToken,
        userId: newUser._id
    })

    logger.info(`New user Token created:`, {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
    })
    try {
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict'
        })
        res.status(201).json({
            status: 'success',
            user: {
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            },
            accessToken,
            message: 'User registered successfully'
        })

        logger.info(`User registered successfully:`, {
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
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
