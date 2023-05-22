import { impl } from 'libs/utils/todo'
import { chooseManyStaticP, ensureOneP } from './choose'
import { MachineLearningAlgorithm } from './models/MachineLearningAlgorithm'

export async function getMachineLearningAlgorithm() {
  return ensureOneP(
    [
      getFromDeepMindPosts,
      getFromMavaPage,
    ],
    await getMachineLearningAlgorithmFilters()
  )
}

async function getFromDeepMindPosts(): Promise<MachineLearningAlgorithm[]> {
  throw impl()
}

async function getFromMavaPage(): Promise<MachineLearningAlgorithm[]> {
  // https://github.com/instadeepai/Mava#system-implementations
  throw impl()
}

export async function getMachineLearningAlgorithmFilters() {
  return chooseManyStaticP([
    isReinforcementLearningAlgorithm,
    supportsPOMDP,
    supportsChangingRules,
    doesNotRequireCompleteSimulation,
  ], [
    async (filter) => {
      throw impl()
    },
  ])
}

async function isReinforcementLearningAlgorithm(algorithm: MachineLearningAlgorithm): Promise<boolean> {
  throw impl()
}

async function supportsPOMDP(algorithm: MachineLearningAlgorithm): Promise<boolean> {
  throw impl()
}

async function supportsChangingRules(algorithm: MachineLearningAlgorithm): Promise<boolean> {
  throw impl()
}

async function doesNotRequireCompleteSimulation(algorithm: MachineLearningAlgorithm): Promise<boolean> {
  throw impl()
}
