import { Schema, model } from 'mongoose'

const SWorkflow = new Schema(
  {
    requestor: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
      unique: true,
      index: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'Workflow Type',
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: 'Workflow Status',
      required: true,
      unique: true,
      index: true,
    },
    next: {
      type: Schema.Types.ObjectId,
      ref: 'Workflow Steps',
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
)

const SWorkflowStep = new Schema({
  request: {
    type: Schema.Types.ObjectId,
    ref: 'Workflow',
    required: true,
    unique: true,
    index: true,
  },
  // actor - kelangan condition, tsaka supervision/ roles
  actor: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
    unique: true,
    index: true,
  },
  stepName: String,
})

const SWorkflowType = new Schema({
  name: String,
})

const SWorkflowStatus = new Schema({
  name: String,
})

export const Workflow = model('Workflow', SWorkflow)
export const WorkflowType = model('Workflow Type', SWorkflowType)
export const WorkflowStatus = model('Workflow Status', SWorkflowStatus)
