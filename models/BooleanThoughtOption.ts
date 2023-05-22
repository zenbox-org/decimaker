import { isEqualByD } from 'libs/utils/lodash'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { $ts, ThoughtLike, ThoughtsSchema } from '../../generic/models/Thought'

export const BooleanThoughtOptionSchema = z.object({
  value: z.boolean(),
  thoughts: ThoughtsSchema,
}).describe('BooleanThoughtOption')

export const BooleanThoughtOptionsSchema = z.array(BooleanThoughtOptionSchema)
  .superRefine(getDuplicatesRefinement('BooleanThoughtOption', parseBooleanThoughtOptionUid))

export const BooleanThoughtOptionUidSchema = BooleanThoughtOptionSchema.pick({
  value: true,
})

export type BooleanThoughtOption = z.infer<typeof BooleanThoughtOptionSchema>

export type BooleanThoughtOptionUid = z.infer<typeof BooleanThoughtOptionUidSchema>

export function parseBooleanThoughtOption(option: BooleanThoughtOption): BooleanThoughtOption {
  return BooleanThoughtOptionSchema.parse(option)
}

export function parseBooleanThoughtOptions(options: BooleanThoughtOption[]): BooleanThoughtOption[] {
  return BooleanThoughtOptionsSchema.parse(options)
}

export function parseBooleanThoughtOptionUid(optionUid: BooleanThoughtOptionUid): BooleanThoughtOptionUid {
  return BooleanThoughtOptionUidSchema.parse(optionUid)
}

export const isEqualBooleanThoughtOption = (a: BooleanThoughtOption) => (b: BooleanThoughtOption) => isEqualByD(a, b, parseBooleanThoughtOptionUid)

export const bto = (value: boolean, thoughts: ThoughtLike[]) => parseBooleanThoughtOption({
  value,
  thoughts: $ts(thoughts),
})

export const btos = (pros: ThoughtLike[], cons: ThoughtLike[]) => [
  bto(true, pros),
  bto(false, cons),
]

export const btosYes = (pros: ThoughtLike[], cons: ThoughtLike[]) => true

export const btosNo = (pros: ThoughtLike[], cons: ThoughtLike[]) => false
