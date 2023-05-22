import { Mapper, MapperP, MapperTwoSym } from '../../generic/models/Mapper'

export type Asserter<Val> = Mapper<Val, void> // may throw an error

export type AsserterP<Val> = MapperP<Val, void> // may throw an error

export type AsserterTwoSym<Val> = MapperTwoSym<Val, void>
