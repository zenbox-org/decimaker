/* eslint-disable require-yield */
import { impl } from 'libs/utils/todo'
import { FilterP } from '../../generic/models/Filter'
import { Type } from '../../programming/models/Type'
import { ProducerBatchStaticP } from '../models/Producer'

export enum Metatype {producer, filter, estimator}

// export async function getDecisionViaGeneratorsAlternative<TheType>(metatype) {
//   const name = getName()
//   const type = getType(name)
//   const generator: Generator<Producer<TheType>> =
// }

function getDefaultValue<TheType>(type: Type): TheType {
  throw impl()
}

function * getFilterGenerator<TheType>(type: Type): Generator<FilterP<TheType>, undefined, void> {
  throw impl()
}

function * getProducerGenerator<TheType>(type: Type): Generator<ProducerBatchStaticP<TheType>, undefined, FilterP<TheType>[]> {
  yield async () => [getDefaultValue(type)]
  throw impl()
}

function updateTypeToMatchFilter<TheType>(type: Type, filter: FilterP<TheType>) {
  throw impl()
}

function updateTypeToMatchProducer<TheType>(type: Type, producer: ProducerBatchStaticP<TheType>) {
  throw impl()
}

function getValue<TheType>(values: TheType[], filters: FilterP<TheType>[]) {
  return values.find(value => filters.every(filter => filter(value)))
}
