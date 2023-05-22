import { isEqualByD } from 'libs/utils/lodash'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { NameSchema } from '../../generic/models/Name'
import { NotesSchema } from '../../generic/models/Notes'
import { RiskTargetSchema } from './RiskTarget'

export const RiskSchema = z.object({
  name: NameSchema,
  isPreventable: z.boolean(),
  target: RiskTargetSchema,
  notes: NotesSchema,
}).describe('Risk')

export const RisksSchema = z.array(RiskSchema)
  .superRefine(getDuplicatesRefinement('Risk', parseRiskUid))

export const RiskUidSchema = RiskSchema.pick({
  name: true,
})

export type Risk = z.infer<typeof RiskSchema>

export type RiskUid = z.infer<typeof RiskUidSchema>

export function parseRisk(risk: Risk): Risk {
  return RiskSchema.parse(risk)
}

export function parseRisks(risks: Risk[]): Risk[] {
  return RisksSchema.parse(risks)
}

export function parseRiskUid(riskUid: RiskUid): RiskUid {
  return RiskUidSchema.parse(riskUid)
}

export const isEqualRisk = (a: Risk) => (b: Risk) => isEqualByD(a, b, parseRiskUid)
