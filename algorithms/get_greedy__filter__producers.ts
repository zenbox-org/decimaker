import { Cage, Caged, CageP } from 'libs/utils/cage'
import { ensure, ensureP } from 'libs/utils/ensure'
import { every } from 'lodash-es'
import { Filter, FilterP } from '../../generic/models/Filter'
import { MapperP } from '../../generic/models/Mapper'
import { RunnerP } from '../../generic/models/Runner'
import { OptionG } from '../models/Option'
import { ProducerB, ProducerBP } from '../models/Producer'
import { SummerP } from '../models/Summer'

export async function chooseOneUsingFilterProducersP<Option>(filter: FilterP<Option>, producers: ProducerBP<Option>[]): Promise<Option | undefined> {
  for (const producer of producers) {
    for await (const options of await producer()) {
      for (const option of options) {
        if (await filter(option)) {
          return option
        }
      }
    }
  }
}

export async function ensureOneUsingFilterProducersP<Option, Error extends Caged>(filter: FilterP<Option>, producers: ProducerBP<Option>[], error?: CageP<Error>) {
  return ensureP(chooseOneUsingFilterProducersP(filter, producers), error)
}

export function chooseOneUsingFilterProducers<Option>(filter: Filter<Option>, producers: ProducerB<Option>[]): Option | undefined {
  for (const producer of producers) {
    for (const options of producer()) {
      for (const option of options) {
        if (filter(option)) {
          return option
        }
      }
    }
  }
}

export function ensureOneUsingFilterProducers<Option, Error extends Caged>(filter: Filter<Option>, producers: ProducerB<Option>[], error?: Cage<Error>) {
  return ensure(chooseOneUsingFilterProducers(filter, producers), error)
}

export async function mapFilterProducersP<Option, OptionMapped>(mapper: MapperP<Option, OptionMapped>, filter: Filter<Option>, producers: ProducerB<Option>[]): Promise<OptionMapped[]> {
  const results = []
  for (const producer of producers) {
    for (const options of producer()) {
      for (const option of options) {
        if (filter(option)) {
          results.push(await mapper(option))
        }
      }
    }
  }
  return results
}

/**
 * NODE: If a single mapper throws an error, the execution will stop
 */
export async function mapFilterProducersUntilP<Option, OptionMapped>(mapper: MapperP<Option, OptionMapped>, preFilter: Filter<Option>, postFilter: Filter<OptionMapped>, producers: ProducerB<Option>[]): Promise<OptionMapped[]> {
  const results: OptionMapped[] = []
  producer_loop: for (const producer of producers) {
    for (const options of producer()) {
      const postFilterResults = []
      for (const option of options) {
        if (preFilter(option)) {
          const result = await mapper(option)
          results.push(result)
          postFilterResults.push(postFilter(result))
        }
      }
      if (!every(postFilterResults)) continue producer_loop // switch to next producer
    }
  }
  return results
}

export async function mapSlidingP<Input, Output, Gauge>(initial: Gauge, summer: SummerP<Gauge>, gatekeeper: FilterP<Gauge>, mapper: MapperP<Input, OptionG<Output, Gauge>>, filter: FilterP<Input>, producers: ProducerBP<Input>[]): Promise<Output[]> {
  const values: Output[] = []
  let current = initial
  for (const producer of producers) {
    for await (const options of producer()) {
      for (const option of options) {
        if (await filter(option)) {
          const { value, gauge } = await mapper(option)
          values.push(value)
          current = await summer(current, gauge)
          if (!await gatekeeper(current)) {
            return values
          }
        }
      }
    }
  }
  return values
}

export async function runAllUntilP<Ctx>(context: Ctx, runners: RunnerP<Ctx, boolean>[]) {
  for (const runner of runners) {
    const result = await runner(context)
    if (!result) return
  }
}

export async function runAllGaugedUntilP<Ctx, Val, Stat>(context: Ctx, gatekeeper: FilterP<Stat>, runners: RunnerP<Ctx, OptionG<Val, Stat>>[]) {
  const values: Val[] = []
  for (const runner of runners) {
    const { value, gauge } = await runner(context)
    if (!await gatekeeper(gauge)) {
      return values
    }
  }
  return values
}

/**
 * @see mapSlidingP
 */
export async function mapFilterProducersSlidingP<Option, OptionMapped>(limit: number, mapper: MapperP<Option, SlidingResult<OptionMapped>>, filter: Filter<Option>, producers: ProducerB<Option>[]): Promise<OptionMapped[]> {
  const results: OptionMapped[] = []
  let total = 0
  for (const producer of producers) {
    for (const options of producer()) {
      for (const option of options) {
        if (filter(option)) {
          const { value, usage } = await mapper(option)
          total += usage
          results.push(value)
          if (total > limit) return results
        }
      }
    }
  }
  return results
}

export interface SlidingResult<Val> {
  value: Val
  usage: number
}

// export async function runCompare<Ctx, Input, Output>(preFilter: Filter<Runner<Ctx, Output>>, postFilter: Filter<Result>, producers: Producer<Option>[]): Promise<Result[]> {
//   const results = []
//   producer_loop: for (const producer of producers) {
//     for (const options of producer()) {
//       const postFilterResults = []
//       for (const option of options) {
//         if (preFilter(option)) {
//           const result = await mapper(option)
//           results.push(result)
//           postFilterResults.push(postFilter(result))
//         }
//       }
//       if (!every(postFilterResults)) continue producer_loop // switch to next producer
//     }
//   }
//   return results
// }
