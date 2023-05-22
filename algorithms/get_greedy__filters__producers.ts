import { every } from 'lodash-es'
import { FilterP } from '../../generic/models/Filter'
import { ensureOptionP } from '../ensureOption'
import { ProducerBP } from '../models/Producer'

export async function get_greedy_Filters_Producers<Option>(filters: FilterP<Option>[], producers: ProducerBP<Option>[]) {
  return ensureOptionP(fetch_greedy_Schema_Filter_BatchProducer(filters, producers))
}

export async function fetch_greedy_Schema_Filter_BatchProducer<Option>(filters: FilterP<Option>[], producers: ProducerBP<Option>[]): Promise<Option | undefined> {
  for (const producer of producers) {
    for await (const options of await producer()) {
      for (const option of options) {
        const results = await Promise.all(filters.map(filter => filter(option)))
        if (every(results)) {
          return option
        }
      }
    }
  }
}
