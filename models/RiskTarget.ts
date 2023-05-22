import { getDuplicatesRefinement } from 'libs/utils/zod'
import { identity } from 'lodash-es'
import { z } from 'zod'

/**
 * Algorithm risk examples: requires too much time, requires unavailable resources, doesn't have a convergence guarantee
 * Output risk examples: can buy a product with bad reviews, can hire an impostor employee, can select a suboptimal marketing channel
 */
export const RiskTargetSchema = z.enum(['Algorithm', 'Output']).describe('RiskTarget')

export const RiskTargetsSchema = z.array(RiskTargetSchema)
  .superRefine(getDuplicatesRefinement('RiskTarget', identity))

export type RiskTarget = z.infer<typeof RiskTargetSchema>

export function parseRiskTarget(target: RiskTarget): RiskTarget {
  return RiskTargetSchema.parse(target)
}

export function parseRiskTargets(targets: RiskTarget[]): RiskTarget[] {
  return RiskTargetsSchema.parse(targets)
}

export const isEqualRiskTarget = (a: RiskTarget) => (b: RiskTarget) => a === b
