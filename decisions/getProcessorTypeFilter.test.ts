import { expect } from 'libs/chai/init'
import { z } from 'zod'
import { Many, One, Two, Zero } from '../../generic/data/allGuesstimates'
import { ufbn } from '../../utils/Estimator'
import { GuesstimateSchema } from '../../generic/models/Guesstimate'
import { $ts, ThoughtsSchema } from '../../generic/models/Thought'
import { ensureOneSimpleStatic } from '../choose'

test(getProcessorTypeFilter.name, () => {
  expect(getProcessorTypeFilter().name).to.equal('ExtendPreobjectOneSchema')
})

export function getProcessorTypeFilter() {
  const schema = z.object({
    name: z.string(),
    desc: ThoughtsSchema,
    inputsLength: GuesstimateSchema,
    schemasCount: GuesstimateSchema,
    nestingLevels: GuesstimateSchema,
    checksForUndefined: GuesstimateSchema,
  })
  const thoughts = $ts([
    ['schemasCount > One implies that we need to assign each preobject to a variable, so that we could reference it in the object'],
  ])
  const options: z.infer<typeof schema>[] = [
    {
      name: 'ExtendPreobjectTwoSchemas',
      desc: $ts([
        ['Inputs contain a preobject'],
        ['Output is an object that extends the preobject'],
      ]),
      inputsLength: One,
      schemasCount: Two,
      nestingLevels: One,
      checksForUndefined: Zero,
    },
    {
      name: 'ExtendPreobjectOneSchema',
      desc: $ts([
        ['Inputs contain an object without specific fields'],
        ['Output is object with specific fields'],
      ]),
      inputsLength: One,
      schemasCount: One,
      nestingLevels: One,
      checksForUndefined: Many,
    },
    {
      name: 'WrapPreobject',
      desc: $ts([
        ['Inputs contain a preobject'],
        ['Output is object that wraps the preobject'],
      ]),
      inputsLength: One,
      schemasCount: Two,
      nestingLevels: Two,
      checksForUndefined: Zero,
    },
    {
      name: 'BuildObjectFromSeparateFields',
      desc: $ts([
        ['Inputs contain required fields'],
        ['Output is object'],
      ]),
      inputsLength: Many,
      schemasCount: One,
      nestingLevels: One,
      checksForUndefined: Zero,
    },
  ]
  return ensureOneSimpleStatic(options, undefined, ufbn(
    o => [],
    o => [o.inputsLength, o.schemasCount, o.nestingLevels]
  ))
}
