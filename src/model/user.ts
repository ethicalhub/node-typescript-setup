import { Schema, model } from 'mongoose'
import { IUser } from '@/types'

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            minlength: [3, 'Username must be at least 3 characters'],
            maxlength: [20, 'Username cannot exceed 20 characters'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email must be unique'],
            maxlength: [50, 'Email cannot exceed 50 characters']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false, // Exclude password from queries by default
            minlength: [6, 'Password must be at least 6 characters'],
            maxlength: [64, 'Password cannot exceed 64 characters']
        },
        role: {
            type: String,
            enum: { values: ['user', 'admin'], message: 'Role must be either user or admin' },
            default: 'user'
        },
        firstName: {
            type: String,
            maxlength: [30, 'First name cannot exceed 30 characters']
        },
        lastName: {
            type: String,
            maxlength: [30, 'Last name cannot exceed 30 characters']
        },
        socialLinks: {
            github: {
                type: String,
                maxlength: [100, 'GitHub link cannot exceed 100 characters']
            },
            X: {
                type: String,
                maxlength: [100, 'X link cannot exceed 100 characters']
            },
            linkedin: {
                type: String,
                maxlength: [100, 'LinkedIn link cannot exceed 100 characters']
            },
            website: {
                type: String,
                maxlength: [100, 'Website link cannot exceed 100 characters']
            },
            youtube: {
                type: String,
                maxlength: [100, 'YouTube link cannot exceed 100 characters']
            }
        }
    },
    {
        timestamps: true
    }
)

export default model<IUser>('User', userSchema, 'users') // 'users' is the collection name in MongoDB
