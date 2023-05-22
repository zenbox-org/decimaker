import { z } from 'zod'
import { Id } from '../../generic/models/Id'
import { FuncSchema } from '../../programming/models/Func'

export const MachineLearningAlgorithmSchema = FuncSchema.extend({

})

export type MachineLearningAlgorithm = z.infer<typeof MachineLearningAlgorithmSchema>

export function validateMachineLearningAlgorithm(algorithm: MachineLearningAlgorithm) {
  return MachineLearningAlgorithmSchema.parse(algorithm)
}

export function getMachineLearningAlgorithmUid(algorithm: MachineLearningAlgorithm): Id {
  return algorithm.name
}
