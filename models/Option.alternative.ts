import { BigNumber } from 'libs/utils/BigNumber/utils'
import { parallel } from 'libs/utils/promise'

/**
 * Decisions rules:
 * - Do what is intellectually right even if it feels emotionally wrong (retrain yourself to ensure that emotional decisions match intellectual decisions)
 * - Accept "The Axiom" (see getLifeStrategy)
 *
 * Software development strategy:
 * - Write complete types to ensure structural stability of the code (complete = that fully match the data provider types)
 * - Write partial functions to save time
 */

/**
 * Notes:
 * - Low-level decisions depend on high-level decisions
 * - We can't make high-level decisions precisely, because we don't fully understand our world
 */

export interface OptionInfo<Opt, Num> {
  option: Opt,
  estimate?: Num
}

export type Generator<Result> = () => Promise<Result>

// Estimator should return undefined for options that are filtered out
export type EstimatorMaybe<Option, Num> = (option: Option) => Promise<Num | undefined>

export type Comparator<Option, Num> = (a: OptionInfo<Option, Num>, b: OptionInfo<Option, Num>) => number

export type RunnerOrig<Project, Result> = {
  (): Promise<Result>
  original: (project: Project) => Promise<Result>
}

export function getOptions<Option, Num>(infos: OptionInfo<Option, Num>[], comparator: Comparator<Option, Num>) {
  return infos
    .filter(r => r.estimate)
    .sort(comparator)
    .map(r => r.option)
}

export async function getOptionsBy<Option, Num>(options: Option[], estimator: EstimatorMaybe<Option, Num>, comparator: Comparator<Option, Num>): Promise<Option[]> {
  return getOptions(await parallel<OptionInfo<Option, Num>>(options.map(async option => {
    return {
      option,
      estimate: await estimator(option),
    }
  })), comparator)
}

export function compareBigNumber<Option>(a: OptionInfo<Option, BigNumber>, b: OptionInfo<Option, BigNumber>) {
  // NOTE: estimate difference is reverse (negative) because bigger estimate should lead to lower index
  return (a.estimate && b.estimate) ? b.estimate.minus(a.estimate).toNumber() : 0
}

export function compareNumber<Option>(a: OptionInfo<Option, number>, b: OptionInfo<Option, number>) {
  // NOTE: estimate difference is reverse (negative) because bigger estimate should lead to lower index
  return (a.estimate && b.estimate) ? b.estimate - a.estimate : 0
}

export async function getBestOption<Option, Num>(infos: OptionInfo<Option, Num>[], comparator: Comparator<Option, Num>): Promise<Option> {
  return getOptions(infos, comparator)[0]
}

export async function runBestOption<Result, Option extends Generator<Result>, Num>(infos: OptionInfo<Option, Num>[], comparator: Comparator<Option, Num>): Promise<Result> {
  return (await getBestOption(infos, comparator))()
}

export async function getBestOptionBy<Option, Num>(options: Option[], estimator: EstimatorMaybe<Option, Num>, comparator: Comparator<Option, Num>): Promise<Option> {
  return (await getOptionsBy(options, estimator, comparator))[0]
}

export async function runBestOptionBy<Result, Option extends Generator<Result>, Num>(options: Option[], estimator: EstimatorMaybe<Option, Num>, comparator: Comparator<Option, Num>): Promise<Result> {
  const bestOption = await getBestOptionBy(options, estimator, comparator)
  if (!bestOption) throw new Error('Can\'t run an empty value')
  return bestOption()
}

export async function getBestOptionByBigNumber<Option>(options: Option[], estimator: EstimatorMaybe<Option, BigNumber>): Promise<Option> {
  return getBestOptionBy(options, estimator, compareBigNumber)
}

export async function getBestOptionByNumber<Option>(options: Option[], estimator: EstimatorMaybe<Option, number>): Promise<Option> {
  return getBestOptionBy(options, estimator, compareNumber)
}

export async function runBestOptionByBigNumber<Result, Option extends Generator<Result>>(options: Option[], estimator: EstimatorMaybe<Option, BigNumber>): Promise<Result> {
  return runBestOptionBy(options, estimator, compareBigNumber)
}

export async function runBestOptionByNumber<Result, Option extends Generator<Result>>(options: Option[], estimator: EstimatorMaybe<Option, number>): Promise<Result> {
  return runBestOptionBy(options, estimator, compareNumber)
}

// type ProjectFunc<$Project extends Config, $Result> = (project: $Project) => Promise<$Result>
//
// export function getRunner<$Project extends Config, $Result, $Option extends ProjectFunc<$Project, $Result>>(option: $Option, project: $Project): RunnerOrig<$Project, $Result> {
//   const func = async () => option(project)
//   func.original = option
//   return func
// }
