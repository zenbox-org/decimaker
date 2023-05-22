import { isEqualByD } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { IdSchema } from '../../../generic/models/Id'

export const DataEditorSchema = z.object({
  id: IdSchema,
}).describe('DataEditor')

export const DataEditorUidSchema = DataEditorSchema.pick({
  id: true,
})

export const DataEditorsSchema = getArraySchema(DataEditorSchema, parseDataEditorUid)

export type DataEditor = z.infer<typeof DataEditorSchema>

export type DataEditorUid = z.infer<typeof DataEditorUidSchema>

export function parseDataEditor(editor: DataEditor): DataEditor {
  return DataEditorSchema.parse(editor)
}

export function parseDataEditors(editors: DataEditor[]): DataEditor[] {
  return DataEditorsSchema.parse(editors)
}

export function parseDataEditorUid(editorUid: DataEditorUid): DataEditorUid {
  return DataEditorUidSchema.parse(editorUid)
}

export const isEqualDataEditor = (a: DataEditor) => (b: DataEditor) => isEqualByD(a, b, parseDataEditorUid)
