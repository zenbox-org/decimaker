import { impl } from 'libs/utils/todo'
import { Decision } from '../models/Decision'
import { Goal } from '../models/Goal'
import { HasConverged } from '../models/HasConverged'
import { Option, OptionT } from '../models/Option'
import { makeFromHigherOrderFunctions } from './makeFromHigherOrderFunctions'

export async function makeFromProofs<Val, Dec extends Decision, Opt extends Option<Val>>(decision: Dec, hasConverged: HasConverged<Val, Dec, OptionT<Val>>): Promise<Goal[]> {
  /**
   * Prove that a decision is optimal given the current timestamp
   * @see makeFromHigherOrderFunctions
   */
  throw impl()
}
