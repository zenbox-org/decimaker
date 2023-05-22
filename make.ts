import { Task } from '../../models/Task'
import { task } from '../../src/task'
import { Decision } from './models/Decision'
import { Goal } from './models/Goal'

type GetTasks<Dec extends Decision> = (decision: Dec) => Promise<Goal[]>

type GetOptions<Dec extends Decision, Opt> = (decision: Dec) => Promise<Opt[]>

export async function make1<Val>(now: Date, deadline: Date, value: Val) {
  if (value) {
    return value
  } else {
    if (now > deadline) {
      throw task('Remove a filter')
    } else {
      throw task('Add a new producer')
    }
  }
}

export function makeBasic<Val>(value: Val, tasks: Task[]) {
  if (value) {
    return value
  } else {
    throw tasks
  }
}
