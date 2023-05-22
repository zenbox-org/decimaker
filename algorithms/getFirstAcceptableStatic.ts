import { ensureFind } from 'libs/utils/ensure'
import { Filter, FilterP } from '../../generic/models/Filter'
import { OptionNotFound } from '../tasks'

export async function getFirstAcceptableStatic<Option>(filter: FilterP<Option>, options: Option[]): Promise<Option> {
  for (const option of options) {
    if (await filter(option)) {
      return option
    }
  }
  throw OptionNotFound()
}

export function getFirstAcceptableStaticSync<Option>(filter: Filter<Option>, options: Option[]) {
  return ensureFind(options, filter, OptionNotFound)
}
