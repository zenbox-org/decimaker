import { getInserter } from 'libs/utils/zod'
import { getMachineLearningAlgorithmUid, MachineLearningAlgorithm, MachineLearningAlgorithmSchema } from './MachineLearningAlgorithm'

export const allMachineLearningAlgorithms: MachineLearningAlgorithm[] = []

export const addMachineLearningAlgorithm = getInserter('MachineLearningAlgorithm', MachineLearningAlgorithmSchema, getMachineLearningAlgorithmUid, allMachineLearningAlgorithms)
