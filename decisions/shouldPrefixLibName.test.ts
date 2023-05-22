import { writeFile } from 'fs/promises'
import { minimize } from 'libs/utils/BigNumber/utils'
import { testEqual } from 'libs/utils/jest/testGetter'
import { todo } from 'libs/utils/todo'
import { capitalize, every } from 'lodash-es'
import { basename } from 'path'
import { High, Low } from '../../generic/data/allGuesstimates'
import { Guesstimate } from '../../generic/models/Guesstimate'
import { chooseOneWrappedSimpleStatic } from '../choose'
import { Option } from '../models/Option'

testEqual(shouldPrefixLibName, false)

interface PrefixLibNameOption extends Option<boolean> {
  length: Guesstimate
  isUnambiguous: boolean
}

const options: PrefixLibNameOption[] = [
  {
    value: true,
    length: High,
    isUnambiguous: true,
  },
  {
    value: false,
    length: Low,
    isUnambiguous: !!getDisambiguationStrategy(),
  },
]

export function shouldPrefixLibName() {
  return chooseOneWrappedSimpleStatic(options, o => every([
    o.isUnambiguous,
  ]), o => minimize(o.length))
}

function getDisambiguationStrategy() {
  return createUnambiguousExport
}

async function createUnambiguousExport(dir: string) {
  const name = basename(dir)
  const allExports = getExports(dir)
  const object = makeExportedObject(allExports)
  await writeFile(`${dir}/index.ts`, `
    export const ${capitalize(name)} = ${object}
  `)
}

interface Export {
  name: string
  filename: string
}

function getExports(dir: string) {
  return todo<Export[]>()
}

function makeExportedObject(allExports: Export[]) {
  return todo<string>()
}
