import { isEqualByD } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { EditorSchema } from './Editor'
import { StorageSchema } from './Storage'
import { TaskGeneratorSchema } from './TaskGenerator'

export const TechStackSchema = z.object({
  storage: StorageSchema,
  editor: EditorSchema,
  generator: TaskGeneratorSchema,
}).describe('TechStack')

export const TechStackUidSchema = TechStackSchema.pick({

})

export const TechStacksSchema = getArraySchema(TechStackSchema, parseTechStackUid)

export type TechStack = z.infer<typeof TechStackSchema>

export type TechStackUid = z.infer<typeof TechStackUidSchema>

export function parseTechStack(stack: TechStack): TechStack {
  return TechStackSchema.parse(stack)
}

export function parseTechStacks(stacks: TechStack[]): TechStack[] {
  return TechStacksSchema.parse(stacks)
}

export function parseTechStackUid(stackUid: TechStackUid): TechStackUid {
  return TechStackUidSchema.parse(stackUid)
}

export const isEqualTechStack = (a: TechStack) => (b: TechStack) => isEqualByD(a, b, parseTechStackUid)
