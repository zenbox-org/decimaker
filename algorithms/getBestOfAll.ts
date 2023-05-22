import { ensureOption } from '../ensureOption'
import { ProducerBP } from '../models/Producer'
import { getAllValuesBP } from '../models/Producer/getAllOptions'
import { Reducer } from '../models/Reducer'

/**
 * NOTE: regular batched `get` algorithm can be reduced to this algorithm by ensuring the producer only has one batch
 */
export async function getBestOfAll<Option>(producer: ProducerBP<Option>, reducer: Reducer<Option>) {
  const options = await getAllValuesBP(producer)
  const option = await reducer(options)
  return ensureOption(option)
}
