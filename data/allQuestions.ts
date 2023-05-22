import { getFinder, getInserter, getName } from 'libs/utils/zod'
import { Optional } from 'ts-toolbelt/out/Object/Optional'
import { $ts } from '../../generic/models/Thought'
import { parseQuestionUid, Question, QuestionSchema } from '../models/Question'

export const allQuestions: Question[] = []

export const addQuestion = getInserter<Question>(getName(QuestionSchema), QuestionSchema, parseQuestionUid, allQuestions)

export const findQuestion = getFinder(parseQuestionUid, allQuestions)

export const addQuestionD = (question: Optional<Question, 'variants' | 'implications'>) => addQuestion({
  variants: [],
  implications: [],
  ...question,
})

// - Do you have infinite or finite options?
//   - Do you have multiple ways to get a batch of options?
//   - Is the time to get a new choice constant, or does it increase with the number of existing choices? (it gets harder to find new options)
// - Is it easier to get new choices in batches?
//   - Are choices very different or not so different?
//   - Do you assume that negative options exist?
//   - Do you assume that positive options exist?
//   - Do you actually have negative options?
//   - Do you actually have positive choices?
//   - Do you have an obvious generator of new choices?
//   - Do you have a default choice?
//   - What are your resource limits?
//   - #briefs
//   - Ensure that limits are objective, not subjective
// - #examples
// - Subjective: "I don't want to spend more than X"
// - Objective: "I have X in my wallet"
// - Objective: "My boss gave me X, and I can't ask for more"
// - Do you have a deadline?
//   - What is your budget?
//   - Does the target have a significant influence on your quality of life?
//   - #examples
//   - Notebook
//   - Phone
//   - #counterexamples
//   - Everything else
// - If yes: it's an investment, so need to estimate by quality, else estimate by cost

addQuestionD({
  name: 'Is it easy to write down all options?',
})

addQuestionD({
  name: 'Is it easy to write down some options?',
})

addQuestionD({
  name: 'Is there a default option?',
})

addQuestionD({
  name: 'Is it easy to write down at least one locator for each option?',
})

addQuestionD({
  name: 'Is it easy to write down all producers that collectively produce all options?',
})

addQuestionD({
  name: 'What is the name of your target type?',
  variants: [
    'What are you looking for?',
  ],
})

addQuestionD({
  name: 'Can you find the target?',
  variants: [
    'Can you get the target from the outside world without too many modifications?',
  ],
})

addQuestionD({
  name: 'Can you make the target?',
  variants: [
    'Can you create the target yourself?',
  ],
})

addQuestionD({
  name: 'What properties of the target type are important to you?',
})

addQuestionD({
  name: 'What is the most important positive property?',
})

addQuestionD({
  name: 'What is the most important negative property?',
  implications: $ts([
    ['(Pair<MostImportantPositiveProperty, MostImportantNegativeProperty>) => Estimator'],
  ]),
})

addQuestionD({
  name: 'Is property X objective?',
  implications: $ts([
    ['Throw if not objective'],
  ]),
})

addQuestionD({
  name: 'Is it easy to evaluate the property X?',
  variants: [
    'Can you set a value for property X quickly and cheaply if you have an object in front of you?',
  ],
  notes: `
    * Sometimes there is a way to optimize evaluation after spending a fixed amount of time
      * Examples
        * Olga can optimize evaluation of "SMMSpecialist.knowsLatestTrends" by spending time on learning the latest trends herself
  `,
})

addQuestionD({
  name: 'Who is the target filter of the decision?',
  implications: $ts([
    ['Yourself => you can take the first idea that comes to your mind and change it when you find a non-passing filter down the road'],
    ['Other person => can you see the result?', [
      ['Yes => you can take the first idea and tweak it later'],
      ['No => you need to experiment'],
    ]],
    ['Machine => build the filter from docs'],
  ]),
})

addQuestionD({
  name: 'Is it easy to change the decision later?',
})

addQuestionD({
  name: 'Does the set of filters change over time?',
  variants: [
    'Does the problem definition change over time?',
  ],
  notes: `
    * If the problem definition changes over time, you're optimizing for a moving goal
      * Can be done only if you know how exactly it changes over time, and then the problem can be reformulated as: "Find a function from time to current problem to solution"
  `,
})

addQuestionD({
  name: 'Can you direct the option generation using observations?',
  variants: [
    'Can you use the result of evaluation of the current option to influence the generation of the next option?',
    'Does the producer take the value of the option as input?',
  ],
  implications: $ts([
    ['Evolution depends on it'],
    ['Examples', [
      'Startups',
      'Life',
    ]],
  ]),
  notes: `
    * Got this question from the Metaheuristics book (stochastic optimization, gradient ascent method)
    * This is the only way to optimize against a moving goal (non-stationary problem)
  `,
})

const czPrinciples = 'https://www.binance.com/en/blog/from-cz/czs-principles-6343713009794494746'

addQuestionD({
  name: 'Does the decision have long-term or short-term consequences?',
  variants: [
    'How wide is the distribution of decision consequences?',
  ],
  source: czPrinciples,
})

addQuestionD({
  name: 'Is the decision reversible?',
  variants: [
    'Is it possible to sort the options instead of filtering, then map through each one with backtracking?',
  ],
  source: czPrinciples,
})

addQuestionD({
  name: 'Have you made a lot of similar decisions in the past?',
  variants: [
    'Are you an expert on this domain?',
  ],
  source: czPrinciples,
})

addQuestionD({
  name: 'Do you have enough information to make this decision?',
  variants: [
    // not sure how to formalize it
  ],
  source: czPrinciples,
})
