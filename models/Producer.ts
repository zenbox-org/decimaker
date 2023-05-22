/**
 * Producers are functions that return a generator because JavaScript provides a convenient notation for such function: function * ()
 */

export type Producer<Val> = () => Generator<Val>

export type ProducerP<Val> = () => AsyncGenerator<Val>

export type ProducerBatch<Val> = () => Generator<Val[]>

export type ProducerBatchP<Val> = () => AsyncGenerator<Val[]>

export type ProducerB<Val> = ProducerBatch<Val>

export type ProducerBP<Val> = ProducerBatchP<Val>

export type ProducerBatchStatic<Val> = () => Val[]

export type ProducerBatchStaticP<Val> = () => Promise<Val[]>

export type ProducerBatchC<Val, Ctx> = (context: Ctx) => Generator<Val[]>

export type ProducerBatchCP<Val, Ctx> = (context: Ctx) => AsyncGenerator<Val[]>

export const getConstantProducerB = <Val>(values: Val[]): ProducerB<Val> => function * () { yield values }

export const getConstantProducerBP = <Val>(values: Val[]): ProducerBP<Val> => async function * () { yield values }
