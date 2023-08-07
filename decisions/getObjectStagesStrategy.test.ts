import { expect } from 'libs/chai/init'
import { todo } from 'libs/utils/todo'
import { z } from 'zod'
import { $t, $ts, ThoughtsSchema } from '../../generic/models/Thought'
import { ensureOneSimpleStatic } from '../choose'

test.skip(getObjectStagesStrategy.name, () => {
  expect(getObjectStagesStrategy().name).to.equal(todo())
})

export function getObjectStagesStrategy() {
  const schema = z.object({
    name: z.string(),
    desc: ThoughtsSchema,
  })
  const action = $t('A function executed by the human', [
    ['Human receives the function type and the input values'],
  ])
  const options: z.infer<typeof schema>[] = [
    {
      name: 'WorkflowEngine',
      desc: $ts([
        ['Examples', [
          ['Apache Airflow'],
          ['Patterns.app', [
            ['Url', ['https://www.patterns.app/docs/concepts']],
          ]],
        ]],
      ]),
    },
    {
      name: 'AutomationEngine',
      desc: $ts([
        ['Examples', [
          ['Zapier'],
          ['Make', [
            ['Url: https://www.make.com/'],
          ]],
        ]],
      ]),
    },
    {
      name: 'PendingPromises',
      desc: $ts([
        ['Implementation', [
          ['Implement each action as a function returning a promise', [
            'When created, the promise pushes a request into the list of requests',
            'When cancelled, the promise removes a request from the list of requests',
          ]],
          ['Implement a getRequests function for viewing the list of requests that are currently pending'],
        ]],
      ]),
    },
    {
      name: 'FakeHTTPRequests',
      desc: $ts([]),
    },
    {
      name: 'PlainFunctions',
      desc: $ts([]),
    },
  ]
  return ensureOneSimpleStatic(options, todo(), todo())
}
