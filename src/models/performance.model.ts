import { Schema, model } from 'mongoose'

const SPerformanceReview = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
    unique: true,
    index: true,
  },
  evaluator: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
    unique: true,
    index: true,
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'Performance Type',
    required: true,
    unique: true,
    index: true,
  },
  evaluatedAt: Date,
})

const SReviewMetric = new Schema({
  review: {
    type: Schema.Types.ObjectId,
    ref: 'Performance Review',
    required: true,
    unique: true,
    index: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Review Category',
    required: true,
    unique: true,
    index: true,
  },
  score: String,
  feedback: String,
})

const SPerformanceType = new Schema({
  name: String,
})

const SPerformanceRecommendation = new Schema({
  name: String,
})

const SReviewCategory = new Schema({
  name: String,
})

export const PerformanceReview = model('Performance Review', SPerformanceReview)
export const PerformanceType = model('Performance Type', SPerformanceType)
export const PerformanceRecommendation = model(
  'Performance Recommendation',
  SPerformanceRecommendation,
)
export const ReviewMetric = model('Review Metric', SReviewMetric)
export const ReviewCategory = model('Review Category', SReviewCategory)
