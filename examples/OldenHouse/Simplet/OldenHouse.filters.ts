import { impl } from 'libs/utils/todo'
import { FilterP } from '../../../../utils/Filter'
import { OldenHouse } from './OldenHouse'

export type OldenHouseFilters = FilterP<OldenHouse>[]

export async function getOldenHouseFilters(): Promise<OldenHouseFilters> {
  throw impl()
}
