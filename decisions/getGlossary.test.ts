import { expect } from 'libs/utils/chai'
import { z } from 'zod'
import { NotesSchema } from '../../generic/models/Notes'
import { $ts } from '../../generic/models/Thought'
import { ensureOneSimpleStatic } from '../choose'

test(getGlossary.name, () => {
  expect(getGlossary().value).to.deep.equal({
    getMaybe: 'findSomething',
    getOrThrow: 'getSomething',
    throwToImitateGet: 'getTaskForSomething',
  })
})

const GlossarySchema = z.object({
  getMaybe: z.string(),
  getOrThrow: z.string(),
  throwToImitateGet: z.string(),
})

export function getGlossary() {
  const schema = z.object({
    value: GlossarySchema,
    notes: NotesSchema,
  })
  const thoughts = $ts([
    ['getOrThrow is used more often'],
    ['getOrThrow is always implemented as ensure(getMaybe, error)'],
  ])
  const verbs = [
    'get',
    'fetch',
    'find',
    'grab',
    'ensure',
    'try',
    'emerge',
    'extract',
    'bring',
    'draw',
    'make',
    'obtain',
    'pull',
  ]
  const chars = [
    '_',
    '$',
  ]
  const getGetName = (char: string) => (left: boolean, middle: boolean, right: boolean) => {
    const get = (value: boolean) => value ? char : ''
    return (verb: string, type: string) => [get(left), verb, get(middle), type, get(right)].join('')
  }
  const getNames = chars.map(getGetName)
  const options: z.infer<typeof schema>[] = [
    {
      value: {
        getMaybe: 'findSomething',
        getOrThrow: 'getSomething',
        throwToImitateGet: 'getTaskForSomething',
      },
      notes: `
        * Same as collection.find
        * Not same as map.get
      `,
    },
  ]
  return ensureOneSimpleStatic(options)
}
