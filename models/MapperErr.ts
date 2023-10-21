import { Mapper, MapperP } from '../../generic/models/Mapper'

export type MapperErr<Val, Err> = Mapper<Val, Err[]>

export type MapperErrP<Val, Err> = MapperP<Val, Err[]>
