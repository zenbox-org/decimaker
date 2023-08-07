import { expect } from 'libs/chai/init'
import { todo } from 'libs/utils/todo'
import { z } from 'zod'
import { $ts } from '../../generic/models/Thought'
import { chooseOneWrappedStatic } from '../choose'

test.skip(getRequestStatusSchema.name, () => {
  expect(getRequestStatusSchema()).to.equal(todo())
})

export async function getRequestStatusSchema() {
  const thoughts = $ts([
    ['"Success" and "Failure" have different interpretations in different contexts', [
      ['Examples', [
        ['Hire a specialist', [
          ['If specialist declines an interview, it is a failure of the whole process but success of a subprocess of sending a request for interview (received a reply)'],
        ]],
      ]],
    ]],
    ['Basic statuses', [
      ['isFinished'],
      ['isSucceeded'],
    ]],
  ])
  const schema = z.object({
    hasPending: z.boolean(),
    hasSuccess: z.boolean(),
    hasFailure: z.boolean(),
    hasTimeout: z.boolean(),
    hasCancelled: z.boolean(),
    hasPostponedByUs: z.boolean(),
    hasPostponedByThem: z.boolean(),
  })
  const options = [
    {
      value: 'RequestStatus model',
      desc: '',
    },
    {
      value: 'undefined, null, value',
      desc: `
        * undefined: request has been sent
        * null: request has timed out 
      `,
    },
    {
      value: 'result tuple',
      desc: `
        * undefined - pending
        * {success: true, value: ...} - success
        * {success: false, reason: ...} - timeout, cancelled, rejected, postponed, ...
      `,
    },
    {
      value: 'status recordings',
      desc: `
        * start(date: Date) - pending (or timeout)
        * success(value: Val) - success
      `,
    },
  ]
  return chooseOneWrappedStatic(options)
}
