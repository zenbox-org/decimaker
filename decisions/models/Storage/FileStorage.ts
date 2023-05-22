import { isEqualByD } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { UrlSchema } from '../../../../generic/models/Url'

export const FileStorageSchema = z.object({
  url: UrlSchema.describe('URL of the file language'),
}).describe('FileStorage')

export const FileStorageUidSchema = FileStorageSchema.pick({
  url: true,
})

export const FileStoragesSchema = getArraySchema(FileStorageSchema, parseFileStorageUid)

export type FileStorage = z.infer<typeof FileStorageSchema>

export type FileStorageUid = z.infer<typeof FileStorageUidSchema>

export function parseFileStorage(storage: FileStorage): FileStorage {
  return FileStorageSchema.parse(storage)
}

export function parseFileStorages(storages: FileStorage[]): FileStorage[] {
  return FileStoragesSchema.parse(storages)
}

export function parseFileStorageUid(storageUid: FileStorageUid): FileStorageUid {
  return FileStorageUidSchema.parse(storageUid)
}

export const isEqualFileStorage = (a: FileStorage) => (b: FileStorage) => isEqualByD(a, b, parseFileStorageUid)
