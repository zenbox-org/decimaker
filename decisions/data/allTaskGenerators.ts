import { getFinder, getInserter, getName } from 'libs/utils/zod'
import { parseTaskGeneratorUid, TaskGenerator, TaskGeneratorSchema } from '../models/TaskGenerator'

export const allTaskGenerators: TaskGenerator[] = []

export const addTaskGenerator = getInserter(getName(TaskGeneratorSchema), TaskGeneratorSchema, parseTaskGeneratorUid, allTaskGenerators)

export const findTaskGenerator = getFinder(parseTaskGeneratorUid, allTaskGenerators)

export const Code = addTaskGenerator({
  id: 'Code',
  allowsFullControl: true,
  allowsToMakeRigidStrategicDecisions: true,
  allowsToMakeFlexibleStrategicDecisions: true,
})

export const N8N = addTaskGenerator({
  id: 'N8N',
  allowsFullControl: false,
  allowsToMakeRigidStrategicDecisions: false,
  allowsToMakeFlexibleStrategicDecisions: false,
})
