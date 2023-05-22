import { z } from 'zod'
import { PathSchema } from '../../filesystem/Path'
import { Id } from '../../generic/models/Id'

export const GoalTypeSchema = z.enum([
  // UpdateType is not needed (superseded by typechecker errors)
  'AddProducer', // needed to produce options
  'AddFilter', // needed to formalize our intuitive filters
  'AddEstimator', // needed to sort options if a batch producer returns multiple options
  'EvaluateResult', // intuitively check whether result is good

  // The only "real" goals are "UpdateProducer" + "UpdateReducer" ()
])

export const GoalTypes = GoalTypeSchema.enum

export const GoalSchema = z.object({
  type: GoalTypeSchema,
})

export const FileGoalSchema = z.object({
  message: z.string(),
  path: PathSchema,
  line: z.number(), // 1-based
})

export type Goal = z.infer<typeof GoalSchema>

export function validateGoal(goal: Goal) {
  return GoalSchema.parse(goal)
}

export function getGoalUid(goal: Goal): Id {
  return JSON.stringify(goal)
}
