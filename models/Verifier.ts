import { Filter } from '../../utils/Filter'
import { Asserter, AsserterTwoSym } from '../../utils/Asserter'
import { Mapper, MapperTwoSym } from '../../utils/Mapper'

/*
 * NOTE: Use original types
 *
 * The following code is just for demonstration purposes
 */

export type VerifierReturnErrors<Val, Err> = Mapper<Val, Err[]>

export type VerifierReturnBoolean<Val> = Filter<Val>

export type VerifierThrowError<Val> = Asserter<Val>

export type VerifierReturnErrorsTwoSym<Val, Err> = MapperTwoSym<Val, Err[]>

export type VerifierThrowErrorTwoSym<Val, Err> = AsserterTwoSym<Val> // may throw Err
