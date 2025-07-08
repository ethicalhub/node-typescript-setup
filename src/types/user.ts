import { Types } from 'mongoose'

export interface IUser {
    username: string
    email: string
    password: string
    role: 'user' | 'admin'
    firstName?: string
    lastName?: string
    socialLinks?: {
        github?: string
        X?: string
        linkedin?: string
        website?: string
        youtube?: string
    }
}

export interface IUserToken {
    token: string
    userId: Types.ObjectId
}
