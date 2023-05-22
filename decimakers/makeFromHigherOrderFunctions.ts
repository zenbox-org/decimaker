import { impl } from 'libs/utils/todo'
import { Decision } from '../models/Decision'
import { Goal } from '../models/Goal'
import { HasConverged } from '../models/HasConverged'
import { Option, OptionT } from '../models/Option'

export async function makeFromHigherOrderFunctions<Val, Dec extends Decision, Opt extends Option<Val>>(decision: Dec, hasConverged: HasConverged<Val, Dec, OptionT<Val>>): Promise<Goal[]> {
  /**
   * "Make from holes"
   * At each point in decision, decide on how to split the current "goal" by substituting an argument for a function call
   * Maintain flow by splitting into neutral functions
   */
  throw impl()
}
