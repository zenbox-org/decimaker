import { identity } from 'lodash-es'
import { ZodObject, ZodRawShape } from 'zod/lib/types'

export function getSchemaBuilder(
  isEasyToFindOptionLocators: true,
  isEasyToMakeOptionDescriptors: boolean
): typeof getSchemaFromLocators

export function getSchemaBuilder(
  isEasyToFindOptionLocators: false,
  isEasyToMakeOptionDescriptors: true
): typeof getSchemaFromDescriptors

export function getSchemaBuilder(
  isEasyToFindOptionLocators: boolean,
  isEasyToMakeOptionDescriptors: boolean
) {
  if (isEasyToFindOptionLocators) return getSchemaFromLocators
  if (isEasyToMakeOptionDescriptors) return getSchemaFromDescriptors
  return identity
}

export function getSchemaFromLocators<ZRS extends ZodRawShape>(locators: string[], schema: ZodObject<ZRS>, keys: (keyof ZRS)[]) {
  const mask = Object.fromEntries(keys.map<[keyof ZRS, boolean]>(k => [k, true])) as { [k in keyof ZRS]?: true; }
  return schema.pick(mask)
}

export function getSchemaFromDescriptors<ZRS extends ZodRawShape>(descriptors: string[], schema: ZodObject<ZRS>) {
  return schema
}

export function getSchemaFromNamedOptions<Val, ZRS extends ZodRawShape>(options: { name: string }[], schema: ZodObject<ZRS>, keys: (keyof ZRS)[]) {
  return getSchemaFromLocators(options.map(w => w.name), schema, keys)
}
