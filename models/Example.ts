import { z } from 'zod'
import { Id } from '../../generic/models/Id'

export const ExampleSchema = z.object({
  name: z.string(),
})

export type Example = z.infer<typeof ExampleSchema>

export function validateExample(example: Example) {
  return ExampleSchema.parse(example)
}

export function getExampleUid(example: Example): Id {
  return example.name
}
