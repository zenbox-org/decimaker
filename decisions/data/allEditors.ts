import { getFinder, getInserter, getName } from 'libs/utils/zod'
import { Editor, EditorSchema, parseEditorUid } from '../models/Editor'

export const allEditors: Editor[] = []

export const addEditor = getInserter(getName(EditorSchema), EditorSchema, parseEditorUid, allEditors)

export const findEditor = getFinder(parseEditorUid, allEditors)

export const WebStormEditor = addEditor({
  url: 'https://www.jetbrains.com/webstorm/',
  canEditModel: true,
  canEditData: true,
})

export const RetoolDatabaseEditor = addEditor({
  url: 'https://docs.retool.com/docs/retool-database',
  canEditModel: true,
  canEditData: true,
  notes: `
    * Very low-level model editor
      * Can set NULLABLE
      * Can set defaults as SQL expressions
    * Very low-level data editor
      * Foreign keys must be set as integer values (no autocomplete)
  `,
})

export const CodaAppEditor = addEditor({
  url: 'https://coda.io/',
  canEditModel: true,
  canEditData: true,
})
