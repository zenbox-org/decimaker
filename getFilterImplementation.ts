import { num } from 'libs/utils/BigNumber/utils'
import { ensureOneStaticP } from './choose'

export async function getFilterImplementation() {
  const options = [
    {
      name: 'Use schema with refines',
      schemaType: 'ZodEffects',
      areFiltersVisibleInGetCall: false,
      codeSize: 1,
    },
    {
      name: 'Use schema with filters array',
      schemaType: 'ZodSchema',
      areFiltersVisibleInGetCall: true,
      codeSize: 1,
    },
  ]
  return ensureOneStaticP(options, [
    async o => o.areFiltersVisibleInGetCall,
  ], [
    async (o) => num(1).div(o.codeSize),
  ])
}
