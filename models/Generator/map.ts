import { Mapper } from '../../../generic/models/Mapper'

export const map = <In, Out>(mapper: Mapper<In, Out>) => (generator: Generator<In>) => {
  const values: Out[] = []
  for (const value of generator) {
    values.push(mapper(value))
  }
  return values
}

export const mapP = <In, Out>(mapper: (value: In) => Promise<Out>) => async (generator: AsyncGenerator<In>) => {
  const values: Out[] = []
  for await (const option of generator) {
    // NOTE: awaiting a value on every iteration
    values.push(await mapper(option))
  }
  return values
}
