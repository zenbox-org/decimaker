import { ZodSchema } from 'zod'
import { ensureOptionP } from '../ensureOption'
import { ProducerBP } from '../models/Producer'
import { Reducer } from '../models/Reducer'

export async function get_greedy_Producer_Reducer<Option>(producer: ProducerBP<Option>, reducer: Reducer<Option>) {
  return ensureOptionP(fetch_greedy_Producer_Reducer(producer, reducer))
}

export async function fetch_greedy_Producer_Reducer<Option>(producer: ProducerBP<Option>, reducer: Reducer<Option>) {
  for await (const options of await producer()) {
    const option = await reducer(options)
    if (option) return option
  }
  // const { generator, filter, estimator } = config
  // if (config.generator.isStatic) {
  //   return ensureOneStatic
  // } else {
  //   return ensureOne
  // }
  // if (!config.filter.isInformedByExperience && !config.filter.isComposite) {
  //   throw MustBeComposite('filter')
  // }
  // if (!config.estimator.isInformedByExperience && !config.estimator.isComposite) {
  //   throw MustBeComposite('estimator')
  // }
}

/**
 * Requires specifying the schema
 */
export async function get_greedy_Schema_Producer_Reducer<Option>(schema: ZodSchema<Option>, producer: ProducerBP<Option>, reducer: Reducer<Option>) {
  return get_greedy_Producer_Reducer<Option>(producer, reducer)
}
