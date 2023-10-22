import { BigNumber } from 'libs/utils/BigNumber/utils'
import { EstimatorP } from '../../utils/Estimator'
import { FilterP } from '../../utils/Filter'
import { ensureOneStaticP } from '../choose'
import { OptionNotFound } from '../tasks'

export async function getBestPositiveAcceptable<Option>(options: Option[], filter: FilterP<Option>, estimator: EstimatorP<Option, BigNumber>) {
  const isPositive: FilterP<Option> = async (option) => (await estimator(option)).isPositive()
  return ensureOneStaticP(options, [filter, isPositive], [estimator], OptionNotFound)
}
