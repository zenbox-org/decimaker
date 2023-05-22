import { num } from 'libs/utils/BigNumber/utils'
import { todo } from 'libs/utils/todo'
import { z } from 'zod'
import { High, Low } from '../../generic/data/allGuesstimates'
import { GuesstimateSchema } from '../../generic/models/Guesstimate'
import { ensureOneStatic } from '../choose'
import { getSchemaFromNamedOptions } from '../getters/getSchemaBuilderFromHints'

export function getBuilderOptionsStructureDesc() {
  const options = [
    {
      name: 'Regular arguments',
      canSeeArgumentNames: false, // only with a special IDE
      canHaveSimpleOptionalArguments: false, // must specify every argument
      codeSize: Low,
      notes: `
        * And mimics other builders
        * And easier to chain builders
        * And easier to write signatures
      `,
    },
    {
      name: 'Object options',
      canSeeArgumentNames: true,
      canHaveSimpleOptionalArguments: true,
      codeSize: High,
    },
  ]
  const schema = getSchemaFromNamedOptions(options, z.object({
    canSeeArgumentNames: z.boolean(),
    codeSize: GuesstimateSchema,
  }), todo())
  return ensureOneStatic(options, [], [
    o => num(1).div(o.codeSize),
  ])
}
