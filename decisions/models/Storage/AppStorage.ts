import { isEqualByD } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { NotesSchema } from '../../../../generic/models/Notes'
import { UrlSchema } from '../../../../generic/models/Url'

export const AppStorageSchema = z.object({
  url: UrlSchema,
  notes: NotesSchema,
}).describe('AppStorage')

export const AppStorageUidSchema = AppStorageSchema.pick({
  url: true,
})

export const AppStoragesSchema = getArraySchema(AppStorageSchema, parseAppStorageUid)

export type AppStorage = z.infer<typeof AppStorageSchema>

export type AppStorageUid = z.infer<typeof AppStorageUidSchema>

export function parseAppStorage(storage: AppStorage): AppStorage {
  return AppStorageSchema.parse(storage)
}

export function parseAppStorages(storages: AppStorage[]): AppStorage[] {
  return AppStoragesSchema.parse(storages)
}

export function parseAppStorageUid(storageUid: AppStorageUid): AppStorageUid {
  return AppStorageUidSchema.parse(storageUid)
}

export const isEqualAppStorage = (a: AppStorage) => (b: AppStorage) => isEqualByD(a, b, parseAppStorageUid)
