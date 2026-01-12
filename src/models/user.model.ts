import { Schema, model } from 'mongoose'

const SUser = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: String,
  },
  {
    timestamps: true,
  },
)

export const User = model('User', SUser)
