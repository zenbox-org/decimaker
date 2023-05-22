import { z } from 'zod'
import { Id } from '../../generic/models/Id'
import { DecisionSchema } from './Decision'
import { GoalSchema } from './Goal'

/**
 * A decision-making system (decimaker) is a function from a high-level task to an array of low-level tasks
 *
 * Examples:
 * - From "Get money" to an array of tasks related to making money
 *
 * Options:
 * - Guide the programmer by giving him tasks based on decision state
 *   - Notes
 *     - A decision state can be constructed from file path
 *     - A decision state can be constructed from inline object
 *     - Better to use an inline object because it allows to represent the decision state precisely
 *
 * Notes:
 * - Looks like a function for programming in general
 */

export const DecimakerSchema = z.function().args(DecisionSchema).returns(z.promise(z.array(GoalSchema)))

export type Decimaker = z.infer<typeof DecimakerSchema>

export function validateDecimaker(decimaker: Decimaker) {
  return DecimakerSchema.parse(decimaker)
}

export function getDecimakerUid(decimaker: Decimaker): Id {
  return decimaker.toString()
}
