import { testEqual } from 'libs/utils/jest/testGetter'
import { every } from 'lodash-es'
import { z } from 'zod'
import { toName } from '../../generic/models/Name/toName'
import { NotesSchema } from '../../generic/models/Notes'
import { ensureOneSimpleStatic } from '../choose'

testEqual(getProcessDesign, 'OneSchemaPerProcess', toName)

export function getProcessDesign() {
  /**
   * TODO: Rename models:
   * - Goal -> Process
   * - Process -> Activity
   */
  const schema = z.object({
    name: z.string(),
    notes: NotesSchema,
    canAddArtifactsWithoutDatabaseMigration: z.boolean(),
    canUseComplexStructures: z.boolean(),
    isFullyCustomizable: z.boolean(),
  })
  const options: z.infer<typeof schema>[] = [
    {
      name: 'OneSchemaPerProcess',
      notes: `
        * Create a generic Activity schema
        * Create a project Activity schema (extend generic)
        * Create a specific Activity schema (extend project)
      `,
      canAddArtifactsWithoutDatabaseMigration: false,
      canUseComplexStructures: true,
      isFullyCustomizable: true,
    },
    {
      name: 'GenericSchemaForAllProcesses',
      notes: `
        * Use goal to connect multiple processes
        * Use artifacts to store the results
          * There's no real difference between {key: value} and {values: [{name: string, value: any}]} besides type safety
            * We can achieve type safety by running the values through parse*Artifact (small runtime cost)
          * Use dated boolean artifacts to store contact events
        * Use status to store the end result
      `,
      canAddArtifactsWithoutDatabaseMigration: true,
      canUseComplexStructures: false,
      isFullyCustomizable: false,
    },
  ]
  return ensureOneSimpleStatic(options, o => every([
    o.isFullyCustomizable,
  ]))
}
