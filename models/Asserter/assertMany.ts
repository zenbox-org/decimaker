import { parallel, parallelMap } from 'libs/utils/promise'
import { AlwaysTrueTypeGuard } from 'libs/utils/typescript'
import { Asserter, AsserterP } from '../Asserter'

export const assertMany = <Err>(isError: (e: unknown) => e is Err) => <Val>(values: Val[], assertOne: Asserter<Val>, assertAll: Asserter<Val[]>) => {
  const errors = values.reduce<Err[]>(function (errors, value) {
    try {
      assertOne(value)
    } catch (e) {
      if (isError(e)) {
        return errors.concat([e])
      } else {
        throw e
      }
    }
    return errors
  }, [])
  try {
    assertAll(values)
  } catch (e) {
    if (isError(e)) {
      errors.push(e)
    } else {
      throw e
    }
  }
  if (errors.length) throw errors
  return values
}

export const enforceManyP = <Err>(isError: (e: unknown) => e is Err) => async <Val>(values: Val[], enforceOne: AsserterP<Val>, enforceAll: AsserterP<Val[]>) => {
  const one = async () => { await parallelMap(values, enforceOne) }
  const all = async () => { await parallelMap([values], enforceAll) }
  await parallel([
    one(),
    all(),
  ])
  return values
}

export const enforceManyAnyP = enforceManyP(AlwaysTrueTypeGuard)
