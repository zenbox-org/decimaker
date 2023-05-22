import { chooseManyWrappedSimpleStatic } from '../choose'
import { CodaAppEditor, RetoolDatabaseEditor, WebStormEditor } from './data/allEditors'
import { CodaAppStorage, PostgreSQLDatabaseStorage, TypeScriptFileStorage } from './data/allStorages'
import { Code } from './data/allTaskGenerators'
import { parseTechStacks } from './models/TechStack'

export function getTechStack() {
  const tests = [
    {
      task: 'Send an initial message to influencer',
      notes: `
        * Must select a different message depending on influencer parameters
      `,
    },
    {
      task: 'Send a followup message to influencer',
    },
    {
      task: 'Make an agreement with the influencer',
    },
    {
      task: 'Ensure the influencer has scheduled a call',
    },
  ]
  const options = parseTechStacks([
    {
      storage: TypeScriptFileStorage,
      editor: WebStormEditor,
      generator: Code,
    },
    {
      storage: CodaAppStorage,
      editor: CodaAppEditor,
      generator: Code,
    },
    {
      storage: PostgreSQLDatabaseStorage,
      editor: RetoolDatabaseEditor,
      generator: Code,
    },
  ])
}

export function getTechStackFilterDescs() {
  const options = [
    {
      value: 'Must fetch data from external sources',
      examples: [
        'Enrich lead data with Clearbit / Hunter / ...',
      ],
    },
    {
      value: 'Must validate the data',
      examples: [
        'Channel URL domain must be included in the list of social network domains',
      ],
    },
    {
      value: 'Must clean the data',
      examples: [
        'Remove spaces',
      ],
    },
  ]
  return chooseManyWrappedSimpleStatic(options)
}

export function getTechStackEstimatorDescs() {
  const options = [
    {
      value: 'Should minimize the time for building a new workflow',
    },
    {
      value: 'Should support granular permissions',
    },
    {
      value: 'Should have a UI for non-coders',
    },
  ]
  return chooseManyWrappedSimpleStatic(options)
}
