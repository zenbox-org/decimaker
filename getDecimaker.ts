import { BigNumber, minimize } from 'libs/utils/BigNumber/utils'
import { impl } from 'libs/utils/todo'
import { EstimatorP } from '../generic/models/Estimator'
import { FilterP } from '../generic/models/Filter'
import { axiom, theorem } from '../programming/models/NaturalPhrase'
import { ensureOneP } from './choose'
import { makeDefault } from './decimakers/makeDefault'
import { makeFromGitCommits } from './decimakers/makeFromGitCommits'
import { getTimeTrackingStrategy } from './getTimeTrackingStrategy'
import { Decimaker } from './models/Decimaker'
import { Example, validateExample } from './models/Example'
import { ProducerBatchStaticP } from './models/Producer'

export const DecimakerExamples: Example[] = [
  validateExample({
    name: 'Buy a laptop',
  }),
  validateExample({
    name: 'Get a signed employment agreement for a programmer',
  }),
  validateExample({
    name: 'Get a list of transactions from customers',
  }),
]

export const DecimakerProducers: ProducerBatchStaticP<Decimaker>[] = [
  async (): Promise<Decimaker[]> => [
    makeDefault,
    (function get_makeFromGitCommits() {
      makeFromGitCommits
      throw impl()
    })(),
    (function get_makeFromTheoremProofs() {
      // prove: is_optimal(IndividualContext, DecisionState) = true
      // fill holes in the proof ~ provide arguments to lego functions
      throw impl()
    })(),
    (function get_makeFromPlayerOfGames() {
      // https://arxiv.org/pdf/2112.03178.pdf
      throw impl()
    }),
  ],
]

export const DecimakerFilters: FilterP<Decimaker>[] = [
  async function preventsSpendingTooMuchTimeOnDecision(decimaker: Decimaker) {
    throw impl()
  },
  async function preventsSpendingTooLittleTimeOnDecision(decimaker: Decimaker) {
    // Maybe it's already true by design, since decimaker requires a well-formed decision as an argument
    throw impl()
  },
  async function preventsZoningOut(decimaker: Decimaker) {
    // Synonymous with "maintainsFlow"
    // Should be like a game
    throw impl()
  },
  async function preventsSpendingTooMuchTimeOnDecision(decimaker: Decimaker) {
    throw impl()
  },
  async function returnsErrorsIfDecisionReturnsUndefined(decimaker: Decimaker) {
    throw impl()
  },
]

export const DecimakerEstimators: EstimatorP<Decimaker, BigNumber>[] = [
  async function linesOfCode(decimaker: Decimaker) {
    return minimize(await getLinesOfCode(DecimakerExamples, decimaker))
  },
]

export async function getDecimaker() {
  const timeTrackingStrategy = await getTimeTrackingStrategy()
  return ensureOneP(DecimakerProducers, DecimakerFilters, DecimakerEstimators)
}

async function getLinesOfCode(DecimakerExamples: Example[], decimaker: Decimaker): Promise<number> {
  throw impl()
}

export interface Signature {
  input: Type
  output: Type
}

export interface Type {}

export async function getDecisionMakingSystemSignature(): Promise<Signature> {
  throw impl()
}

export async function getDecisionMakingSystemFilters() {
  const mustDefineOptionType = axiom('Must define the option type in terms of basic types')
  return [
    theorem('Must require a type that matches the file name', [mustDefineOptionType]),
    axiom('Must require a '),
  ]
}

export async function returnsSelf(system: Decimaker): Promise<boolean> {
  throw impl()
}

export async function getCost(system: Decimaker): Promise<BigNumber> {
  throw impl()
}
