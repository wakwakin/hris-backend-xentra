import { Schema, model } from 'mongoose'

const SUser = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
      index: true,
    },
  },
  {
    timestamps: true,
  },
)

const SEmployee = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true,
  },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  gender: { type: String, enum: ['MALE', 'FEMALE'], index: true },
  birthdate: Date,
  type: {
    type: Schema.Types.ObjectId,
    ref: 'EmployeeType',
    required: true,
    unique: true,
    index: true,
  },
  dateHired: Date,
})

const SEmployeeType = new Schema({
  name: String,
})

const SPosition = new Schema({
  name: String,
})

const SLevel = new Schema({
  name: String,
})

export const User = model('User', SUser)
export const Employee = model('Employee', SEmployee)
export const EmployeeType = model('Employee Type', SEmployeeType)
export const Position = model('Position', SPosition)
export const Level = model('Level', SLevel)
