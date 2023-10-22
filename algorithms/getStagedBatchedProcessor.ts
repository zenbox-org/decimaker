import { parallelMap } from 'libs/utils/promise'
import { Result } from 'libs/utils/Result'
import { $ts } from '../../generic/models/Thought'
import { Mapper, MapperP } from '../../utils/Mapper'
import { splitResults } from '../../utils/Result/splitResults'
import { ProducerB, ProducerBP } from '../models/Producer'

export function getStagedBatchedProducer<From, To, Err, CompErr>(producer: ProducerB<From>, mapper: Mapper<From, Result<To, Err>>, getCompositeError: (errors: Err[]) => CompErr) {
  return function * () {
    for (const options of producer()) {
      const { values, errors } = splitResults(options.map(mapper))
      if (errors.length) {
        throw getCompositeError(errors)
      } else {
        yield values
      }
    }
  }
}

export async function mapProducerP<From, To>(producer: ProducerBP<From>, mapper: MapperP<From, To>) {
  return async function * () {
    for await (const options of producer()) {
      yield parallelMap(options, mapper)
    }
  }
}

export function getStagedBatchedProcessor() {
  const thoughts = $ts([
    ['Filters', [
      ['Must support staged objects', [
        'Requires at least two collections of data, or two finders, to check that the data exists',
      ]],
      ['Should throw a composite task'],
      ['Must call a mapper for an unprocessed batch'],
    ]],
    ['Options', [
      ['Return a producer'],
      ['Accept a mapper'],
    ]],
  ])
}
