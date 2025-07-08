import jwt from 'jsonwebtoken'
import config from '@/config/config'

import { Types } from 'mongoose'

export const generateAccessToken = (userId: Types.ObjectId): string => {
    if (!config.JWT_ACCESS_SECRET) {
        throw new Error('JWT_ACCESS_SECRET is not defined')
    }
    return jwt.sign({ userId }, config.JWT_ACCESS_SECRET as string, {
        expiresIn: config.JWT_ACCESS_EXPIRY,
        subject: 'accessApi'
    })
}

export const generateRefreshToken = (userId: Types.ObjectId): string => {
    if (!config.JWT_REFRESH_SECRET) {
        throw new Error('JWT_REFRESH_SECRET is not defined')
    }
    return jwt.sign({ userId }, config.JWT_REFRESH_SECRET as string, {
        expiresIn: config.JWT_REFRESH_EXPIRATION_DAYS,
        subject: 'refreshApi'
    })
}
