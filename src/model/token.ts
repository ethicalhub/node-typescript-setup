import { model, Schema } from 'mongoose'
import { IUserToken } from '@/types'

const tokeSchema = new Schema<IUserToken>({
    token: {
        required: true,
        type: String,
        unique: true
    },
    userId: {
        required: true,
        type: Schema.Types.ObjectId
    }
})

export default model<IUserToken>('Token', tokeSchema)
