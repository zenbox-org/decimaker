import { testEqual } from 'libs/utils/jest/testGetter'
import { every } from 'lodash-es'
import { z } from 'zod'
import { NameSchema } from '../../generic/models/Name'
import { NotesSchema } from '../../generic/models/Notes'
import { SimplePapersSchema } from '../../research/models/SimplePaper'
import { ensureOneSimpleStatic } from '../choose'

testEqual(getGeneralApproach, 'Hand-written decision tree', o => o.name)

const GeneralApproachSchema = z.object({
  name: NameSchema,
  papers: SimplePapersSchema,
  hasCaseStudies: z.boolean(),
  notes: NotesSchema,
})

type GeneralApproach = z.infer<typeof GeneralApproachSchema>

export function getGeneralApproach() {
  const options: GeneralApproach[] = [
    {
      name: 'Reinforcement Learning',
      papers: [
        {
          name: 'State of Hierarchical Reinforcement Learning',
          url: 'https://sci-hub.wf/10.1145/3453160',
          publishedAt: new Date('2021-05-01'),
        },
        {
          name: 'Challenges of Real-World Reinforcement Learning',
          url: 'https://arxiv.org/pdf/1904.12901.pdf',
          publishedAt: new Date('2019-04-29'),
        },
      ],
      hasCaseStudies: false,
      notes: `
        - Found only one case study, so most likely, there are unknown challenges
        - But some problems are not stationary
          - Non-stationarity has been addressed by multiple algorithms
        - But data may not extrapolate correctly
          - #examples 
            - Great salesperson will have a higher conversion rate than a bad salesperson
              - Need to uncover confounders
                - Just meticulously record the data? 
      `,
    },
    {
      name: 'Hand-written decision tree',
      papers: [],
      hasCaseStudies: true, // all big companies
      notes: `
        * And always like this on a high level (because the data for high-level decisions comes in the form of heuristics, "general advice", "rules of thumb")
      `,
    },
  ]
  return ensureOneSimpleStatic(options, o => every([
    o.hasCaseStudies,
  ]))
}
