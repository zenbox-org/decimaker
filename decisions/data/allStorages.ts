import { getFinder, getInserter, getName } from 'libs/utils/zod'
import { parseStorageUid, Storage, StorageSchema } from '../models/Storage'

export const allStorages: Storage[] = []

export const addStorage = getInserter(getName(StorageSchema), StorageSchema, parseStorageUid, allStorages)

export const findStorage = getFinder(parseStorageUid, allStorages)

export const TypeScriptFileStorage = addStorage({
  type: 'file',
  url: 'https://www.typescriptlang.org/',
})

export const JSONFileStorage = addStorage({
  type: 'file',
  url: 'https://www.json.org/',
})

export const PostgreSQLDatabaseStorage = addStorage({
  type: 'database',
  url: 'https://www.postgresql.org/',
})

export const AirtableAppStorage = addStorage({
  type: 'app',
  url: 'https://www.airtable.com/',
  notes: `
    * Validation available as a separate app
      * Or use forms
  `,
})

export const CodaAppStorage = addStorage({
  type: 'app',
  url: 'https://coda.io/',
})
