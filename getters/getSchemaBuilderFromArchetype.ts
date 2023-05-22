import { stub } from 'libs/utils/todo'
import { ZodSchema } from 'zod'

export interface Property {
  name: string,
  schema: ZodSchema
}

export interface FunctionType {
  inputs: Property[]
  output: Property
}

/**
 * Equivalent interpretations:
 * - point & path
 * - object & function
 */
type Archetype = 'data' | 'code'

/**
 * This distinction is incorrect but useful
 */
type DataType = 'boolean' | 'number' | 'string' | 'array' | 'object'

export function getSchemaBuilderFromArchetype(archetype: 'data'): typeof getSchemaDataBuilder

export function getSchemaBuilderFromArchetype(archetype: 'code'): typeof getSchemaCodeBuilder

export function getSchemaBuilderFromArchetype(archetype: Archetype) {
  switch (archetype) {
    case 'data': return getSchemaDataBuilder
    case 'code': return getSchemaCodeBuilder
  }
}

export function getSchemaDataBuilder<Option>(datatype: 'object'): typeof getObjectSchemaBuilder

export function getSchemaDataBuilder<Option>(datatype: DataType) {
  switch (datatype) {
    case 'object': return getObjectSchemaBuilder
    default: return stub<SchemaBuilder<Option>>()
  }
}

type SchemaBuilder<Option> = () => ZodSchema<Option>

export function getSchemaCodeBuilder<Option>() {
  return stub<SchemaBuilder<Option>>()
}

export function getObjectSchemaBuilder<Option>(properties: Property[]) {
  return stub<ZodSchema<Option>>()
}
