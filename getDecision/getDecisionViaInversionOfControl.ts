import { BigNumber } from 'libs/utils/BigNumber/utils'
import { impl } from 'libs/utils/todo'
import { EstimatorP } from '../../utils/Estimator'
import { Type } from '../../programming/models/Type'
import { getName, getType } from '../getIllustration'

/**
 * Bad: stimulates providing a complete option array
 * Bad: does not separate filters (allows to )
 * Bad: spaghetti code
 * Bad: leaves boilerplate within getter
 * Bad: leaves unfinished code (undefined arguments) (build the decision bottom-up)
 */

export async function getDecisionViaInversionOfControl<TheType>(): Promise<TheType> {
  const name = getName()
  const type = getType(name)
  const estimator = await getEstimator(type)
  const getter = await getGetter<TheType>(type, estimator)
  const options = await getOptions<TheType>(type)
  return getter(options)
}

async function getGetter<TheType>(type: Type, estimator: EstimatorP<TheType, BigNumber>) {
  return async function (options: TheType[]): Promise<TheType> {
    return options.sort(function (a, b) {
      throw impl()
    })[0]
  }
}

async function getOptions<TheType>(type: Type): Promise<TheType[]> {
  throw impl()
}

async function getEstimator<TheType>(type: Type): Promise<EstimatorP<TheType, BigNumber>> {
  throw impl()
}
