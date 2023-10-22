import { BigNumber } from 'libs/utils/BigNumber/utils'
import { EstimatorP } from '../../utils/Estimator'
import { FilterP } from '../../utils/Filter'
import { ensureOneSimpleStaticP } from '../choose'
import { OptionNotFound } from '../tasks'

export async function getBestAcceptableOption<Option>(options: Option[], filter: FilterP<Option>, estimator: EstimatorP<Option, BigNumber>) {
  return ensureOneSimpleStaticP(options, filter, estimator, OptionNotFound)
}
