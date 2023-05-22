/* eslint-disable @typescript-eslint/no-explicit-any */
import { todo } from 'libs/utils/todo'
import { z } from 'zod'
import { BooleanFilter, BooleanFilterSchema, Filter } from '../../generic/models/Filter'
import { $ts } from '../../generic/models/Thought'
import { ensureOneWrappedStatic } from '../choose'

const thoughts = $ts([
  ['Wait can be implemented as `throw new WaitTask()`'],
  ['Every error requires its own fallback (a different task)'],
])

export const ensureCP_1 = <Val, Args extends any[]>(getter: (...args: Args) => Promise<Val | undefined>, fallback: (...args: Args) => Promise<void>) => {
  return async (...args: Args): Promise<Val> => {
    const value = await getter(...args)
    if (!value) throw await fallback(...args)
    return value
  }
}

export const ensureCP_2 = <Val, Args extends any[]>(getCached: (...args: Args) => Promise<Val | undefined>, getReal: (...args: Args) => Promise<Val>) => {
  return async (...args: Args): Promise<Val> => {
    const value = await getCached(...args)
    if (value) return value
    return getReal(...args)
  }
}

/**
 * For existence
 */
export const ensureConstantC = <Obj>(object: Obj, otherwise: () => void) => {
  if (object) return object
  otherwise()
}

export const ensureConstantFilterC = <Obj>(object: Obj, filter: Filter<Obj>, otherwise: () => void) => {
  if (filter(object)) return object
  otherwise()
}

export function getCachedCombinator() {
  const schema = z.object({
    value: z.string(),
    taskReturnMethod: z.enum(['throw', 'return']),
    hasContextArg: z.boolean(),
    hasQueryArg: z.boolean(),
    getsValuesFromCache: z.boolean(),
  })
  const options: z.infer<typeof schema>[] = todo([])
  return ensureOneWrappedStatic<string, z.infer<typeof schema>>(options, [
    f => f.getsValuesFromCache,
    f => f.hasContextArg,
    f => hasQueryArgFilter(f.hasQueryArg),
  ], todo())
}

const hasQueryArgFilter = get_hasQueryArgFilter()

function get_hasQueryArgFilter() {
  const schema = z.object({
    value: BooleanFilterSchema,
  })
  const options: z.infer<typeof schema>[] = [
    {
      value: (hasQueryArg) => true,
    },
    {
      value: (hasQueryArg) => hasQueryArg,
    },
    {
      value: (hasQueryArg) => !hasQueryArg,
    },
  ]
  return ensureOneWrappedStatic<BooleanFilter>(options, todo(), todo())
}
