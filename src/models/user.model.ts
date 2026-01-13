import { Schema, model } from 'mongoose'

const SUser = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: String,
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE'},
  },
  {
    timestamps: true,
  },
)

export const User = model('User', SUser)
