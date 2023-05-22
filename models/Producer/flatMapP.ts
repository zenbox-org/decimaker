import { flatten } from 'lodash-es'
import { ProducerB, ProducerBP } from '../Producer'

export async function flatMap<Input, Output>(producer: ProducerB<Input>, mapper: (value: Input) => Output) {
  const outputsArray: Output[][] = []
  for (const options of producer()) {
    outputsArray.push(options.map(mapper))
  }
  return flatten(outputsArray)
}

export async function flatMapP<Input, Output>(producer: ProducerBP<Input>, mapper: (value: Input) => Promise<Output>) {
  const outputsArray: Output[][] = []
  for await (const options of producer()) {
    // NOTE: awaiting a batch on every iteration
    outputsArray.push(await Promise.all(options.map(mapper)))
  }
  return flatten(outputsArray)
}
