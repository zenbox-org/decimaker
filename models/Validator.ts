import { Mapper, MapperP } from '../../generic/models/Mapper'

export type Validator<Val, Err> = Mapper<Val, Err[]>

export type ValidatorP<Val, Err> = MapperP<Val, Err[]>
