import { Config } from '../../models/Config'
import { TaskGenerator } from '../../src/getTasks'
import { Comparator, getBestOptionBy } from './models/Option.alternative'

export async function getBestTaskGenerator<P extends Config, Num>(generators: TaskGenerator<P>[], maxNegativeReturnProbability: number, count: number, project: P, getSample: GetSample<P, Num>, getAverage: GetAverage<Num>, isNegative: IsNegative<Num>, compareNumbers: Comparator<TaskGenerator<P>, Num>) {
  return getBestOptionBy(
    generators,
    async (generator: TaskGenerator<P>) => {
      const sample = await getSample(generator, project, count)
      if (getNegativeReturnProbability(sample, isNegative) < maxNegativeReturnProbability) {
        return getAverage(sample)
      } else {
        return undefined
      }
    },
    compareNumbers
  )
}

export function getNegativeReturnProbability<Num>(sample: Num[], isNegative: IsNegative<Num>): number {
  return sample.filter(v => !isNegative(v)).length / sample.length
}

export type GetSample<P extends Config, Num> = (generate: TaskGenerator<P>, project: P, count: number) => Promise<Num[]>

export type GetAverage<Num> = (values: Num[]) => Num

export type IsNegative<Num> = (value: Num) => boolean
