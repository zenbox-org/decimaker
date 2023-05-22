import { impl } from 'libs/utils/todo'
import { NatureSchema } from '../programming/models/Nature'
import { Type, TypeSchema } from '../programming/models/Type'

export function getName(): string {
  throw impl()
}

/**
 * Default type: empty record
 */
export function getType(name: string): Type {
  return TypeSchema.parse({
    name,
    nature: NatureSchema.enum.function,
  })
}
