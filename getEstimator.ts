import { BigNumber } from 'libs/utils/BigNumber/utils'
import { EstimatorP } from '../generic/models/Estimator'

export async function getEstimatorBigNumber<Obj>(): Promise<EstimatorP<Obj, BigNumber>> {
  const options: EstimatorP<Obj, BigNumber>[] = [
    async function ZeroEstimator(object) {
      return new BigNumber(0)
    },
  ]
  return options[0]
}
