import { isEqualByD } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { UrlSchema } from '../../../../generic/models/Url'

export const DatabaseStorageSchema = z.object({
  url: UrlSchema,
}).describe('DatabaseStorage')

export const DatabaseStorageUidSchema = DatabaseStorageSchema.pick({
  url: true,
})

export const DatabaseStoragesSchema = getArraySchema(DatabaseStorageSchema, parseDatabaseStorageUid)

export type DatabaseStorage = z.infer<typeof DatabaseStorageSchema>

export type DatabaseStorageUid = z.infer<typeof DatabaseStorageUidSchema>

export function parseDatabaseStorage(storage: DatabaseStorage): DatabaseStorage {
  return DatabaseStorageSchema.parse(storage)
}

export function parseDatabaseStorages(storages: DatabaseStorage[]): DatabaseStorage[] {
  return DatabaseStoragesSchema.parse(storages)
}

export function parseDatabaseStorageUid(storageUid: DatabaseStorageUid): DatabaseStorageUid {
  return DatabaseStorageUidSchema.parse(storageUid)
}

export const isEqualDatabaseStorage = (a: DatabaseStorage) => (b: DatabaseStorage) => isEqualByD(a, b, parseDatabaseStorageUid)
