import { assert, asyncProperty } from 'fast-check'
import { arbitraryInterval } from 'libs/utils/fast-check/arbitraries/arbitraryInterval'
import { Interval } from 'luxon'
import { getReplayParameters } from '../../utils/fast-check/replay'
import { arbitraryTasks } from '../util/fast-check/arbitraryTasks'

export type Scheduler = <Task>(interval: Interval, tasks: Task[]) => Promise<ScheduledTask<Task>[]>

export interface ScheduledTask<Task> {
  task: Task,
  interval: Interval
}

export function testScheduler(scheduler: Scheduler) {
  return assert(asyncProperty(arbitraryInterval(), arbitraryTasks(), async (interval, tasks) => {
    // TODO: there are no gaps between ScheduledTask intervals
    // TODO: sum of ScheduledTask intervals is equal to interval
  }), { ...getReplayParameters(), numRuns: 1000 })
}
