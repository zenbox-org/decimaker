import { Filter } from '../../generic/models/Filter'
import { MapperTwoSym } from '../../generic/models/Mapper'
import { Asserter, AsserterTwoSym } from './Asserter'
import { Validator } from './Validator'

/*
 * NOTE: Use original types
 *
 * The following code is just for demonstration purposes
 */

export type VerifierReturnErrors<Val, Err> = Validator<Val, Err>

export type VerifierReturnBoolean<Val> = Filter<Val>

export type VerifierThrowError<Val> = Asserter<Val>

export type VerifierReturnErrorsTwoSym<Val, Err> = MapperTwoSym<Val, Err[]>

export type VerifierThrowErrorTwoSym<Val, Err> = AsserterTwoSym<Val> // may throw Err
