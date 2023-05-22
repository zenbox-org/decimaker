import { getFinder, getInserter, getName } from 'libs/utils/zod'
import { parseRiskUid, Risk, RiskSchema } from '../models/Risk'

export const allRisks: Risk[] = []

export const addRisk = getInserter<Risk>(getName(RiskSchema), RiskSchema, parseRiskUid, allRisks)

export const findRisk = getFinder(parseRiskUid, allRisks)

export const canBuyOverpricedProduct = addRisk({
  name: 'Can buy an overpriced product',
  isPreventable: true,
  target: 'Output',
})

export const canBuyProductWithVeryBadReviews = addRisk({
  name: 'Can buy a product with bad reviews',
  isPreventable: true,
  target: 'Output',
})

export const canBuyProductNotMatchingRequirements = addRisk({
  name: 'Can buy a product that does not match your specific requirements (e.g. no sugar)',
  isPreventable: true,
  target: 'Output',
})

export const canBuyProductThatWillNotBeDelivered = addRisk({
  name: 'Can buy a product which will not be delivered',
  isPreventable: false,
  target: 'Output',
})

export const canSpendTooMuchTimeSearchingForNonExistentProduct = addRisk({
  name: 'Can spend too much time searching for a product that does not exist',
  isPreventable: true,
  target: 'Algorithm',
  notes: 'Filter that always returns false',
})

export const canSpendTooMuchTimeSearchingForBestProduct = addRisk({
  name: 'Can spend too much time searching for the lowest-price product',
  isPreventable: true,
  target: 'Algorithm',
  notes: 'Producer that does not stop',
})

export const canEstimateProductIncorrectly = addRisk({
  name: 'Can estimate a product by an incorrect criteria',
  isPreventable: true,
  target: 'Algorithm',
  notes: 'Incorrect estimator',
})

export const canFilterProductIncorrectly = addRisk({
  name: 'Can filter a product by an incorrect criteria',
  isPreventable: true,
  target: 'Algorithm',
  notes: 'Incorrect filter',
})

export const canForgetImportantCriteria = addRisk({
  name: 'Can forget an important product criteria',
  isPreventable: true,
  target: 'Algorithm',
  notes: 'Incorrect filter',
})
