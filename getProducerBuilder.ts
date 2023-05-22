import { FunCtx } from './get'
import { ProducerBP } from './models/Producer'
import { MustBeComposite } from './tasks'

export interface ProducerConfig<Option> extends FunCtx<Option> {
  isFinite: boolean // the person knows there is a finite amount of options
  batchSize: number // maybe we should propose the batchSize? or the filter on batchSize?
  // TODO: batchSize must depend on the cheapness of the reducer
}

interface StaticProducerConfig<Option> extends ProducerConfig<Option> {
  isStatic: true
}

interface CompositeProducerConfig<Option> extends ProducerConfig<Option> {
  isComposite: true
}

export function getProducerBuilder<Option>(config: StaticProducerConfig<Option>): typeof staticProducerBuilder

export function getProducerBuilder<Option>(config: CompositeProducerConfig<Option>): typeof compositeProducerBuilder

export function getProducerBuilder<Option>(config: ProducerConfig<Option>) {
  const { isInformedByExperience, isComposite, isStatic, isCheap, batchSize } = config
  if (!isInformedByExperience) {
    if (isComposite) {
      return compositeProducerBuilder
    } else {
      throw MustBeComposite('producer')
    }
  }
  if (isStatic) {
    return staticProducerBuilder
  }
  if (isComposite) {
    return compositeProducerBuilder
  }
  return manualProducerBuilder
}

export const staticProducerBuilder = <Option>(options: Option[]) => async function * () {
  yield options
}

export function compositeProducerBuilder<Option>(producers: ProducerBP<Option>[]) {
  return async function * () {
    for (const producer of producers) {
      for await (const options of await producer()) {
        yield options
      }
    }
  }
}

export function manualProducerBuilder<Option>(producer: ProducerBP<Option>) {
  return producer
}
