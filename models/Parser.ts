import { SafeParseReturnType } from 'zod/lib/types'
import { Mapper, MapperP, MapperTwoSym } from '../../generic/models/Mapper'
import { Result } from '../../utils/Result'

export type Parser<In, Out, Err> = Mapper<In, Result<Out, Err>>

export type ParserP<In, Out, Err> = MapperP<In, Result<Out, Err>>

export type ParserTwoSym<In, Out, Err> = MapperTwoSym<In, Result<Out, Err>>

export type ZodParser<In, Out> = Mapper<In, SafeParseReturnType<In, Out>>
