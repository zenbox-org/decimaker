import { isEqualByD } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { AppStorageSchema } from './Storage/AppStorage'
import { DatabaseStorageSchema } from './Storage/DatabaseStorage'
import { FileStorageSchema } from './Storage/FileStorage'

export const StorageSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('file'),
  }).merge(FileStorageSchema),
  z.object({
    type: z.literal('database'),
  }).merge(DatabaseStorageSchema),
  z.object({
    type: z.literal('app'),
  }).merge(AppStorageSchema),
]).describe('Storage')

export const StorageUidSchema = StorageSchema

export const StoragesSchema = getArraySchema(StorageSchema, parseStorageUid)

export type Storage = z.infer<typeof StorageSchema>

export type StorageUid = z.infer<typeof StorageUidSchema>

export function parseStorage(storage: Storage): Storage {
  return StorageSchema.parse(storage)
}

export function parseStorages(storages: Storage[]): Storage[] {
  return StoragesSchema.parse(storages)
}

export function parseStorageUid(storageUid: StorageUid): StorageUid {
  return StorageUidSchema.parse(storageUid)
}

export const isEqualStorage = (a: Storage) => (b: Storage) => isEqualByD(a, b, parseStorageUid)
