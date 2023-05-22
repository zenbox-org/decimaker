import { test } from '@jest/globals'
import { expect } from 'libs/utils/chai'
import { every } from 'lodash-es'
import { z } from 'zod'
import { $ts, ThoughtsSchema } from '../../generic/models/Thought'
import { ensureOneSimpleStatic } from '../choose'

test(getTypeclassesImplementation.name, () => {
  expect(getTypeclassesImplementation().name).to.equal('ConvertValuesUsingMapperFunctions')
})

export function getTypeclassesImplementation() {
  const schema = z.object({
    name: z.string(),
    desc: ThoughtsSchema,
    typeSafe: z.boolean().nullable(),
    canGoToDefinition: z.boolean(),
    canComposeFunctions: z.boolean(),
    functionCallPattern: z.enum(['Func(A, B)', 'Func(Ctx, A, B)', 'Func(new Class(A), new Class(B))']),
    typeclassMethodCallPattern: z.enum(['Ctx.Method(Value)', 'Value.Method()']),
  })
  const options: z.infer<typeof schema>[] = [
    {
      name: 'PassExplicitContext',
      desc: $ts([
      ]),
      typeSafe: true,
      canGoToDefinition: false,
      canComposeFunctions: true,
      functionCallPattern: 'Func(Ctx, A, B)',
      typeclassMethodCallPattern: 'Ctx.Method(Value)',
    },
    {
      name: 'ImportImplicitContext',
      desc: $ts([
        ['Sources', [
          'https://medium.com/@dmkolesnikov/ad-hoc-polymorphism-in-typescript-with-implicit-context-5c11dd668dd',
        ]],
      ]),
      typeSafe: null,
      canGoToDefinition: false,
      canComposeFunctions: true,
      functionCallPattern: 'Func(A, B)',
      typeclassMethodCallPattern: 'Ctx.Method(Value)',
    },
    {
      name: 'ConvertValuesUsingMapperFunctions',
      desc: $ts([
        ['Mitigations', [
          ['Use getters to avoid brackets'],
          ['Use mixins to implement multi-inheritance', [
            'https://www.typescriptlang.org/docs/handbook/mixins.html',
          ]],
          ['Use wrapper functions to wrap the values in classes'],
        ]],
      ]),
      typeSafe: true,
      canGoToDefinition: true,
      canComposeFunctions: false,
      functionCallPattern: 'Func(new Class(A), new Class(B))',
      typeclassMethodCallPattern: 'Value.Method()',
    },
  ]
  return ensureOneSimpleStatic(options, o => every([
    o.typeSafe,
    o.canGoToDefinition,
  ]))
}

const expected = 'test'

interface WithStr {
  str: string
}

const asConstant: WithStr = {
  str: expected,
}

const asGetter: WithStr = {
  get str() { return expected },
}

test('getter is same as constant', () => {
  expect(asConstant.str).to.equal(asGetter.str)
})
