import { z } from 'zod'
import { Id } from '../../generic/models/Id'

export const DecisionSchema = z.object({
  startedAt: z.date(),
})

export type Decision = z.infer<typeof DecisionSchema>

export function validateDecision(decision: Decision) {
  return DecisionSchema.parse(decision)
}

export function getDecisionUid(decision: Decision): Id {
  return JSON.stringify(decision)
}
