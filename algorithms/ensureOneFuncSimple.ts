import { ensureFind } from 'libs/utils/ensure'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { AlwaysOne, EstimatorBigNum } from '../../generic/models/Estimator'
import { AlwaysTrue, Filter } from '../../generic/models/Filter'
import { GenericFunction } from '../../generic/models/GenericFunction'
import { NameSchema } from '../../generic/models/Name'
import { ensureOneSimpleStatic } from '../choose'

/**
 * NOTE: Couldn't get it to type-check correctly
 */
export function ensureOneFuncSimple<T extends { value: GenericFunction }>(options: T[], filter: Filter<T> = AlwaysTrue, estimator: EstimatorBigNum<T> = AlwaysOne) {
  const WithNameSchema = z.object({ name: NameSchema }).passthrough()
  const $schema = WithNameSchema
  const $schemaMulti = z.array($schema).superRefine(getDuplicatesRefinement('Option', o => WithNameSchema.parse(o)))
  const $options = options.map(o => ({
    ...o,
    name: o.value.name,
  }))
  const $option = ensureOneSimpleStatic($options, filter, estimator)
  const option = ensureFind(options, o => o.value.name === $option.name)
  return option.value
}
