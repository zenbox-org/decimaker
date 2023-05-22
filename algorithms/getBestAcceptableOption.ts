import { BigNumber } from 'libs/utils/BigNumber/utils'
import { EstimatorP } from '../../generic/models/Estimator'
import { FilterP } from '../../generic/models/Filter'
import { ensureOneSimpleStaticP } from '../choose'
import { OptionNotFound } from '../tasks'

export async function getBestAcceptableOption<Option>(options: Option[], filter: FilterP<Option>, estimator: EstimatorP<Option, BigNumber>) {
  return ensureOneSimpleStaticP(options, filter, estimator, OptionNotFound)
}
