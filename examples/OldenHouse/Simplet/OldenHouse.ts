import { z } from 'zod'
import { GeoLocationSchema } from '../../../../generic/models/GeoLocation'
import { Id } from '../../../../generic/models/Id'
import { getOldenHouseFilters } from './OldenHouse.filters'

export const OldenHouseSchema = z.object({
  name: z.string(),
  location: GeoLocationSchema,
})

export type OldenHouse = z.infer<typeof OldenHouseSchema>

export function validateOldenHouse(house: OldenHouse) {
  return OldenHouseSchema.parse(house)
}

export function getOldenHouseUid(house: OldenHouse): Id {
  return house.name
}

export const getFilters = getOldenHouseFilters
