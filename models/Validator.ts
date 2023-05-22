import { Mapper } from '../../generic/models/Mapper'

export type Validator<Val, Err> = Mapper<Val, Err[]>
