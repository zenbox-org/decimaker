import { isEqualByD } from 'libs/utils/lodash'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { IdSchema } from '../../generic/models/Id'

export const StrategySchema = z.object({
  id: IdSchema,
}).describe('Strategy')

export const StrategySchemaCandidate = z.object({
  hasNegativeReturns: z.boolean(),
  hasPositiveReturns: z.boolean(),
  hasMonetaryCosts: z.boolean(),
  hasTimeCosts: z.boolean(),
  requiresHiring: z.boolean(),
})

export const StrategiesSchema = z.array(StrategySchema)
  .superRefine(getDuplicatesRefinement('Strategy', parseStrategyUid))

export const StrategyUidSchema = StrategySchema.pick({
  id: true,
})

export type Strategy = z.infer<typeof StrategySchema>

export type StrategyUid = z.infer<typeof StrategyUidSchema>

export function parseStrategy(strategy: Strategy): Strategy {
  return StrategySchema.parse(strategy)
}

export function parseStrategies(strategies: Strategy[]): Strategy[] {
  return StrategiesSchema.parse(strategies)
}

export function parseStrategyUid(strategyUid: StrategyUid): StrategyUid {
  return StrategyUidSchema.parse(strategyUid)
}

export const isEqualStrategy = (a: Strategy) => (b: Strategy) => isEqualByD(a, b, parseStrategyUid)
