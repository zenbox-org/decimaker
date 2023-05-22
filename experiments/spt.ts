import { BigNumber } from 'libs/utils/BigNumber/utils'
import { todo } from 'libs/utils/todo'
import { max, min, sum } from 'lodash-es'
import { chooseManyStatic } from '../choose'

type GetResultSimple = (index: Index) => ResultSimple

type ChooseIndex = (results: ResultSimple[]) => Index

type Projector<Input, Output, Value> = (result: Result<Input, Output>) => Value

type ProjectorBigNum<Input, Output> = Projector<Input, Output, BigNumber>

type GainLossFilter = (gain: BigNumber, loss: BigNumber) => boolean

type Index = number

type RewardN = number

type RewardBN = BigNumber

interface Result<Input, Output> {
  input: Input
  output: Output
  startedAt: number
  finishedAt: number
}

type ResultSimple = Result<Index, RewardN>

type ProjectorBNSimple = ProjectorBigNum<Index, RewardN>

/**
 * Notes:
 * - It is possible that the algorithm will sample after finishedAt, but the sampling will happen at most once
 * - startedAt and finishedAt are set in a way that avoids gaps (so that result[i].finishedAt === result[i+1].startedAt)
 *
 * - The gains are unknown
 * - The losses are unknown (but maybe we can assume that we don't play the games for which the losses are unknown)
 * - Some data is known (at least the arm index)
 * - Only one arm can be pulled every time
 * - There is zero switching cost between the arms
 * - There is a maximum lifetime
 *
 * Assumptions:
 * - Rewards are time (or a resource that is directly interchangeable for time, like food)
 * - There is always a "wait" action that is associated with a reward that is guaranteed to be non-negative (reward >= 0)
 * - Rewards don't take time to be consumed (or are consumed in a single unit of time) (or consumption time is included in the loss)
 *
 * Desiderata:
 * - The algorithm exploits the most historically profitable arm
 * - The algorithm periodically explores the arms with historically low returns (thinking they might have changed)
 * - The algorithm prefers
 */
function play(getResult: GetResultSimple, getIndex: ChooseIndex, budget: number, lifetime: number) {
  const results: ResultSimple[] = []
  let startedAt = Date.now()
  const maxFinishedAt = startedAt + lifetime
  while (startedAt < maxFinishedAt) {
    const index = getIndex(results)
    const result = getResult(index)
    results.push(result)
    startedAt = result.finishedAt
  }
}

function getIndexViaStartupStats(results: ResultSimple[]) {
  const stats = getStartupStats(results)
  return todo<number>()
}

interface Stat {
  count: number
  duration: number
}

function getStartupStats(results: ResultSimple[]) {
  const resultsByIndex = getResultsByIndex(results)
  return results.reduce((stats, result) => {
    let stat = stats.get(result.input)
    if (!stat) {
      stat = {
        count: 0,
        duration: 0,
      }
      stats.set(result.input, stat)
    }
    stat.count += 1
    stat.duration += getDuration(result)
    return stats
  }, new Map<number, Stat>())
}

function getResultsByIndex(results: ResultSimple[]) {
  return results.reduce((map, result) => {
    const results = map.get(result.input)
    if (results) {
      results.push(result)
    } else {
      map.set(result.input, [result])
    }
    return map
  }, new Map<number, ResultSimple[]>())
}

function getDuration(result: ResultSimple) {
  return result.startedAt - result.finishedAt
}

function getStatCalculators() {
  const options = [
    {
      value: getTotalGains,
    },
    {
      value: getTotalLosses,
    },
    {
      value: getSparsenessOfLosses,
    },
  ]
  return chooseManyStatic(options)
}

/**
 * I think it shouldn't matter - only total time should matter
 */
function getLength(trials: ResultSimple[]) {
  return trials.length
}

const getTotalGains = (getGain: ProjectorBNSimple) => (trials: ResultSimple[]) => sum(trials.map(getGain))

function getTotalLosses(trials: ResultSimple[]) {
  return sum(trials.map(t => t.finishedAt - t.startedAt))
}

function getMaxFinishedAt(trials: ResultSimple[]) {
  return max(trials.map(t => t.finishedAt))
}

function getMinStartedAt(trials: ResultSimple[]) {
  return min(trials.map(t => t.startedAt))
}

function getSparsenessOfLosses(trials: ResultSimple[]) {
  const maxFinishedAt = getMaxFinishedAt(trials)
  const minStartedAt = getMinStartedAt(trials)
  if (!maxFinishedAt || !minStartedAt) return undefined
  return getTotalLosses(trials) / (maxFinishedAt - minStartedAt)
}

/**
 * Assuming that trials are sorted by startedAt ascending
 */
const getStreak = (filter: GainLossFilter) => <Input, Output>(getGain: ProjectorBigNum<Input, Output>, getLoss: ProjectorBigNum<Input, Output>) => (trials: Result<Input, Output>[]) => {
  let i = trials.length
  for (i; i > 0; i--) {
    if (!filter(getGain(trials[i - 1]), getLoss(trials[i - 1]))) {
      break
    }
  }
  return trials.slice(i)
}

const LosslessFilter: GainLossFilter = (gain, loss) => gain.gte(loss)

const getLosslessStreak = getStreak(LosslessFilter)
