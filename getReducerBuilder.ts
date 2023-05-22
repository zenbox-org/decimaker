import { isEqual } from 'lodash-es'
import { Filter } from '../generic/models/Filter'
import { FunCtx } from './get'
import { Positivity } from './models/Positivity'
import { Reducer } from './models/Reducer'
import { MustBeComposite } from './tasks'

export interface ReducerConfig<Option> extends FunCtx<Option> {
  hasUnacceptableOptions: boolean
  mostOptionsAre: Positivity
}

const candidateFieldsForReducerConfig = [
  {
    name: 'isDispersionSmall',
    type: 'boolean',
    description: 'the mean of the differences between each estimate and the mean of all estimates is close enough to zero',
    notes: `
      * Can't set isDispersionSmall for multifactor estimator (I need to know what to estimate)
    `,
  },
  {
    name: 'isEstimatorNeeded',
    type: 'boolean',
    description: 'should select from multiple options',
    notes: `
      * Only applicable if batchSize > 1
    `,
  },
]

interface StaticReducerConfig<Option> extends ReducerConfig<Option> {
  isStatic: true
}

interface CompositeReducerConfig<Option> extends ReducerConfig<Option> {
  isComposite: true
}

export function getReducerBuilder<Option>(config: StaticReducerConfig<Option>): typeof staticReducerBuilder

export function getReducerBuilder<Option>(config: CompositeReducerConfig<Option>): typeof compositeReducerBuilder

export function getReducerBuilder<Option>(config: ReducerConfig<Option>) {
  const { hasUnacceptableOptions, isInformedByExperience, isComposite, isStatic, isCheap } = config
  if (!isInformedByExperience) {
    if (isComposite) {
      return compositeReducerBuilder
    } else {
      throw MustBeComposite('reducer')
    }
  }
  if (isStatic) {
    return staticReducerBuilder
  }
  if (hasUnacceptableOptions) {
    return
  }
  if (isComposite) {
    return compositeReducerBuilder
  }
  return dynamicReducerBuilder
}

/**
 * NOTE: This function returns `option` even if it is not included in the batch yielded by the producer
 */
export function staticReducerBuilder<Option>(option: Option) {
  return async function (options: Option[]) {
    // NOTE: no need to check for options.contains(option) because the producer may yield multiple batches, and only the second batch will contain the option
    return option
  }
}

export function staticFilterReducerBuilder<Option>(entries: [Option, boolean][]) {
  return async function (options: Option[]) {
    return options.find(option => entries.find(([$option, $result]) => isEqual(option, $option) && $result))
  }
}

export function filterSyncReducerBuilder<Option>(filters: Filter<Option>[]) {
  // TODO: add estimators?
  return async function (options: Option[]) {
    const $options = options.filter(o => filters.every(f => f(o)))
    return $options[0]
  }
}

export function compositeReducerBuilder<Option>(reducers: Reducer<Option>[]) {
  return async function (options: Option[]) {
    for (const reducer of reducers) {
      const option = await reducer(options)
      if (option) return option
    }
  }
}

export function dynamicReducerBuilder<Option>(reducer: Reducer<Option>) {
  return reducer
}
