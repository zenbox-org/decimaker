/* eslint-disable require-yield */
import { impl } from 'libs/utils/todo'
import { FilterP } from '../../generic/models/Filter'
import { Type } from '../../programming/models/Type'
import { getName, getType } from '../getIllustration'
import { ProducerBatchStaticP } from '../models/Producer'

export async function getDecisionViaGenerators<TheType>() {
  const name = getName()
  const type = getType(name)
  const values: TheType[] = []
  const filters: FilterP<TheType>[] = []
  const filterGenerator = getFilterGenerator<TheType>(type)
  const producers: ProducerBatchStaticP<TheType>[] = []
  const producerGenerator = getProducerGenerator<TheType>(type)
  let producerGeneratorIsNotDone = true
  while (producerGeneratorIsNotDone) {
    const producerResult = producerGenerator.next(filters)
    const producer = producerResult.value
    producerGeneratorIsNotDone = !producerResult.done
    if (producer) {
      updateTypeToMatchProducer(type, producer)
      const $values = await producer()
      $values.map(v => values.push(v))
      const filterGeneratorIsNotDone = true
      while (filterGeneratorIsNotDone) {
        const result = filterGenerator.next()
        const filter = result.value
        if (filter) {
          updateTypeToMatchFilter(type, filter)
          filters.push(filter)
        }
        const value = getValue(values, filters)
        if (value) {
          return value
        }
      }
    }
  }
}

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
