import { flatten } from 'lodash-es'
import { Validator } from '../Validator'

export function parseMany<Val, Err>(values: Val[], parseOne: Validator<Val, Err>, parseAll: Validator<Val[], Err>) {
  return flatten<Err>(values.map(parseOne)).concat(parseAll(values))
}
