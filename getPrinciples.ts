import { BigNumber } from 'libs/utils/BigNumber/utils'
import { AlwaysOneP, EstimatorP } from '../utils/Estimator'
import { AlwaysTrueP, FilterP } from '../utils/Filter'
import { axiom, NaturalPhrase, theorem } from '../programming/models/NaturalPhrase'
import { chooseManyP } from './choose'
import { ProducerBatchStaticP } from './models/Producer'

export type Principle = NaturalPhrase

const Goal = theorem('Decimaker prevents too-fast & too-slow decisions')

const Minimization = axiom('Produce the minimum example that satisfies the type, then check if the type satisfies your intuition')
const Batching = axiom('Use batching to speedup the process (produce multiple values, multiple filters)')
const Recursion = axiom('Use the same decision-making system to choose producers, filters, estimators (provide fixed procedures for these)')
const Holes = axiom('Guide the user by asking to fill the holes')
const AlwaysWorking = axiom('Always keep the code in working condition to minimize anxiety')
const Parametrization = axiom('If you cannot implement a function, make it a parameter to the function that you are currently implementing')
const MultiTrials = axiom('Make multiple trials with different decisions')

export const PrincipleProducers: ProducerBatchStaticP<Principle>[] = [
  async () => [
    Minimization,
    Batching,
    Recursion,
  ],
]

export const PrincipleFilters: FilterP<Principle>[] = [
  AlwaysTrueP,
]

export const PrincipleEstimators: EstimatorP<Principle, BigNumber>[] = [
  AlwaysOneP,
]

export function getPrinciples() {
  return chooseManyP(PrincipleProducers, PrincipleFilters, PrincipleEstimators)
}
