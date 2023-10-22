import { ZodSchema } from 'zod'
import { Filter, FilterP } from '../../utils/Filter'

export function getFilterPs<Option>(schema: ZodSchema<Option>, filters: FilterP<Option>[]) {
  // if (!schema) throw task(`Create a schema for ${name}`, '(instruction for creating a schema)')
  // if (!filters) throw task(`List filters for ${name}`, `
  //   * Check each field
  // `)
  return filters
}

export function getFilter<Option>(schema: ZodSchema<Option>, filter: Filter<Option>) {
  // if (!schema) throw task(`Create a schema for ${name}`, '(instruction for creating a schema)')
  // if (!filters) throw task(`List filters for ${name}`, `
  //   * Check each field
  // `)
  return filter
}
