import { ProducerBP } from '../models/Producer'
import { getAllValuesBP } from '../models/Producer/getAllOptions'
import { ReducerStrict } from '../models/Reducer'

export async function getAtLeastOne<Option>(producer: ProducerBP<Option>, reducer: ReducerStrict<Option>) {
  const options = await getAllValuesBP(producer)
  return reducer(options)
}
