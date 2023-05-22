import { isEqualByD } from 'libs/utils/lodash'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { IdSchema } from '../../generic/models/Id'

export const HabitSchema = z.object({
  id: IdSchema,
}).describe('Habit')

export const HabitsSchema = z.array(HabitSchema)
  .superRefine(getDuplicatesRefinement('Habit', parseHabitUid))

export const HabitUidSchema = HabitSchema.pick({
  id: true,
})

export type Habit = z.infer<typeof HabitSchema>

export type HabitUid = z.infer<typeof HabitUidSchema>

export function parseHabit(habit: Habit): Habit {
  return HabitSchema.parse(habit)
}

export function parseHabits(habits: Habit[]): Habit[] {
  return HabitsSchema.parse(habits)
}

export function parseHabitUid(habitUid: HabitUid): HabitUid {
  return HabitUidSchema.parse(habitUid)
}

export const isEqualHabit = (a: Habit) => (b: Habit) => isEqualByD(a, b, parseHabitUid)
