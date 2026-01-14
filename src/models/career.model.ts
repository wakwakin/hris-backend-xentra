import { Schema, model } from 'mongoose'

const SCareer = new Schema({
  type: String,
})

const SCareerEvent = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
    unique: true,
    index: true,
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'Career',
    required: true,
    unique: true,
    index: true,
  },
  previousValue: String,
  newValue: String,
  effectiveDate: Date,
})

export const Career = model('Career', SCareer)
export const CareerEvent = model('Career Event', SCareerEvent)
