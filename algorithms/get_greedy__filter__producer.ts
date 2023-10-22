import { ZodSchema } from 'zod'
import { FilterP } from '../../utils/Filter'
import { ensureOptionP } from '../ensureOption'
import { ProducerBP } from '../models/Producer'

export async function get_greedy_Schema_Filter_Producer<Option>(schema: ZodSchema<Option>, filter: FilterP<Option>, producer: ProducerBP<Option>) {
  return get_greedy_Filter_Producer(filter, producer)
}

export async function get_greedy_Filter_Producer<Option>(filter: FilterP<Option>, producer: ProducerBP<Option>) {
  return ensureOptionP(fetch_greedy_Schema_Filter_Producer(filter, producer))
}

export async function fetch_greedy_Schema_Filter_Producer<Option>(filter: FilterP<Option>, producer: ProducerBP<Option>): Promise<Option | undefined> {
  for await (const options of await producer()) {
    for (const option of options) {
      if (await filter(option)) {
        return option
      }
    }
  }
}
