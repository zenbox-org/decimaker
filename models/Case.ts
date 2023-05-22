import { z } from 'zod'

export const ExampleSchema = z.object({
  type: z.string(),
})

export type Example = z.infer<typeof ExampleSchema>

export function getExampleUid(example: Example) {
  return example.type
}

export function validateExample(example: Example) {
  return ExampleSchema.parse(example)
}

const HireEmployee = validateExample({
  type: 'Employee',
})

const GetLaptop = validateExample({
  type: 'Laptop',
})
