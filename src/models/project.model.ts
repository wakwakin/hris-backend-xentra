import { Schema, model } from 'mongoose'

const SProject = new Schema({
  name: String,
})

const SProjectAssignment = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
      unique: true,
      index: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      unique: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['PRIMARY', 'SIDE'],
      default: 'PRIMARY',
      index: true,
    },
    approveLeave: Boolean,
    startDate: Date,
    endDate: Date,
  },
  {
    timestamps: true,
  },
)

export const Project = model('Project', SProject)
export const ProjectAssignment = model('Project Assignment', SProjectAssignment)
