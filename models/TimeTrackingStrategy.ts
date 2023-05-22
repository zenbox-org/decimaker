import { z } from 'zod'
import { Id } from '../../generic/models/Id'

export const TimeTrackingStrategySchema = z.object({
  name: z.string(),
})

export type TimeTrackingStrategy = z.infer<typeof TimeTrackingStrategySchema>

export function validateTimeTrackingStrategy(strategy: TimeTrackingStrategy) {
  return TimeTrackingStrategySchema.parse(strategy)
}

export function getTimeTrackingStrategyUid(strategy: TimeTrackingStrategy): Id {
  return strategy.name
}
