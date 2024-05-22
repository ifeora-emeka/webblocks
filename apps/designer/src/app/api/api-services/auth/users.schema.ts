import mongoose, { Schema, Document, Model } from 'mongoose'

export interface UserDocument extends Document {
  first_name: string
  last_name: string
  email: string
  password: string
  avatar_url: string | null
}

const UserSchema: Schema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar_url: {
      type: String,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value: string) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
        },
        message: 'Please enter a valid email address',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    activation_token: {
      type: String,
      trim: true,
      default: null,
      select: false,
    },
    reset_token: {
      type: String,
      trim: true,
      default: null,
      select: false,
    },
  },
  { timestamps: true },
)

const Users: Model<UserDocument> =
  mongoose.models.Users || mongoose.model<UserDocument>('Users', UserSchema)

export default Users
