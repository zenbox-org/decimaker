import { FilterP } from '../../utils/Filter'

/**
 * NOTE: Not a reducer
 */
export function filter<Option>(f: FilterP<Option>) {
  return async function (options: Option[]) {
    return options.filter(f)
  }
}
