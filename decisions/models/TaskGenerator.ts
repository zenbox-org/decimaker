import { isEqualByD } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { IdSchema } from '../../../generic/models/Id'

export const TaskGeneratorSchema = z.object({
  id: IdSchema,
  allowsFullControl: z.boolean(),
  allowsToMakeRigidStrategicDecisions: z.boolean(),
  allowsToMakeFlexibleStrategicDecisions: z.boolean(),
}).describe('TaskGenerator')

export const TaskGeneratorUidSchema = TaskGeneratorSchema.pick({
  id: true,
})

export const TaskGeneratorsSchema = getArraySchema(TaskGeneratorSchema, parseTaskGeneratorUid)

export type TaskGenerator = z.infer<typeof TaskGeneratorSchema>

export type TaskGeneratorUid = z.infer<typeof TaskGeneratorUidSchema>

export function parseTaskGenerator(generator: TaskGenerator): TaskGenerator {
  return TaskGeneratorSchema.parse(generator)
}

export function parseTaskGenerators(generators: TaskGenerator[]): TaskGenerator[] {
  return TaskGeneratorsSchema.parse(generators)
}

export function parseTaskGeneratorUid(generatorUid: TaskGeneratorUid): TaskGeneratorUid {
  return TaskGeneratorUidSchema.parse(generatorUid)
}

export const isEqualTaskGenerator = (a: TaskGenerator) => (b: TaskGenerator) => isEqualByD(a, b, parseTaskGeneratorUid)
