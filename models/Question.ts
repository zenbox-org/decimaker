import { isEqualByD } from 'libs/utils/lodash'
import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { NameSchema } from '../../generic/models/Name'
import { NotesSchema } from '../../generic/models/Notes'
import { ThoughtsSchema } from '../../generic/models/Thought'

export const QuestionSchema = z.object({
  name: NameSchema,
  variants: z.array(NameSchema),
  implications: ThoughtsSchema,
  source: z.string().optional(),
  notes: NotesSchema,
}).describe('Question')

export const QuestionsSchema = z.array(QuestionSchema)
  .superRefine(getDuplicatesRefinement('Question', parseQuestionUid))

export const QuestionUidSchema = QuestionSchema.pick({
  name: true,
})

export type Question = z.infer<typeof QuestionSchema>

export type QuestionUid = z.infer<typeof QuestionUidSchema>

export function parseQuestion(question: Question): Question {
  return QuestionSchema.parse(question)
}

export function parseQuestions(questions: Question[]): Question[] {
  return QuestionsSchema.parse(questions)
}

export function parseQuestionUid(questionUid: QuestionUid): QuestionUid {
  return QuestionUidSchema.parse(questionUid)
}

export const isEqualQuestion = (a: Question) => (b: Question) => isEqualByD(a, b, parseQuestionUid)
