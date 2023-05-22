import { Producer, ProducerP } from '../Producer'

export async function map<Input, Output>(producer: Producer<Input>, mapper: (value: Input) => Output) {
  const values: Output[] = []
  for (const value of producer()) {
    values.push(mapper(value))
  }
  return values
}

export async function mapP<Input, Output>(producer: ProducerP<Input>, mapper: (value: Input) => Promise<Output>) {
  const values: Output[] = []
  for await (const option of producer()) {
    // NOTE: awaiting a value on every iteration
    values.push(await mapper(option))
  }
  return values
}
