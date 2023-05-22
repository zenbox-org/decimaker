import { impl } from 'libs/utils/todo'
import { Decision } from '../models/Decision'
import { Goal, GoalTypes, validateGoal } from '../models/Goal'
import { HasConverged } from '../models/HasConverged'
import { Option, OptionT } from '../models/Option'

export async function makeFromGitCommits<Val, Dec extends Decision, Opt extends Option<Val>>(decision: Dec, hasConverged: HasConverged<Val, Dec, OptionT<Val>>): Promise<Goal[]> {
  const options = await getOptionsFromGit<Val>(decision)
  // convergence is tracked via tests of successful Git commits
  if (await hasConverged(decision, options)) {
    return [] // return option itself
  } else {
    throw [validateGoal({ type: GoalTypes.AddProducer })]
  }
}

async function getOptionsFromGit<Val>(decision: Decision): Promise<OptionT<Val>[]> {
  // timetracking is done via Git
  const commits = await getCommits(decision)
  throw impl()
}

async function getCommits(decision: Decision): Promise<Commit[]> {
  throw impl()
}

export interface Commit {
  timestamp: Date
}
