import { BigNumber, minimize } from 'libs/utils/BigNumber/utils'
import { impl } from 'libs/utils/todo'
import { ensureOneP } from './choose'
import { TimeTrackingStrategy, validateTimeTrackingStrategy } from './models/TimeTrackingStrategy'

/**
 * Decimaker requires tracking time to ensure the user doesn't spend too much time on a decision
 */
export async function getTimeTrackingStrategy(): Promise<TimeTrackingStrategy> {
  return ensureOneP(
    [
      async () => [
        validateTimeTrackingStrategy({
          name: 'Code',
        }),
        validateTimeTrackingStrategy({
          name: 'Git',
        }),
      ],
    ],
    [
      async function mustNotAllowInvalidState(strategy) {
        throw impl()
      },
    ],
    [
      async function time(strategy) {
        return minimize(getTimeTrackingTime(strategy))
      },
    ],
  )
}

function getTimeTrackingTime(strategy: TimeTrackingStrategy): BigNumber {
  throw impl()
}
