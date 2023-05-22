import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { NotesSchema } from '../../../generic/models/Notes'
import { UrlSchema } from '../../../generic/models/Url'

export const EditorSchema = z.object({
  url: UrlSchema,
  canEditModel: z.boolean(),
  canEditData: z.boolean(),
  notes: NotesSchema,
}).describe('ModelEditor')

export const EditorsSchema = z.array(EditorSchema)
  .superRefine(getDuplicatesRefinement('ModelEditor', parseEditorUid))

export const EditorUidSchema = EditorSchema.pick({
  url: true,
})

export type Editor = z.infer<typeof EditorSchema>

export type EditorUid = z.infer<typeof EditorUidSchema>

export function parseEditor(editor: Editor): Editor {
  return EditorSchema.parse(editor)
}

export function parseEditors(editors: Editor[]): Editor[] {
  return EditorsSchema.parse(editors)
}

export function parseEditorUid(editorUid: EditorUid): EditorUid {
  return EditorUidSchema.parse(editorUid)
}
