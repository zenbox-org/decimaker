import { flatten } from 'lodash-es'
import { BigNumber, num } from '../utils/BigNumber/utils'
import { Cage, Caged, CageP } from '../utils/cage'
import { ensure, ensureP } from '../utils/ensure'
import { AlwaysOne, AlwaysOneP, Estimator, EstimatorBigNum, EstimatorP } from '../utils/Estimator'
import { AlwaysTrue, AlwaysTrueP, and, andP, Filter, FilterP } from '../utils/Filter'
import { parallel, together } from '../utils/promise'
import { RunnerP } from '../utils/Runner'
import { isDefined } from '../utils/typescript'
import { Estimated } from './interfaces/Estimated'
import { Filtered } from './interfaces/Filtered'
import { Valued } from './interfaces/Valued'
import { Option, OptionE, OptionF, OptionFE } from './models/Option'
import { ProducerBatchStatic, ProducerBatchStaticP } from './models/Producer'

export async function runOneP<Ctx, Res, Err extends Caged = Error>(context: Ctx, producers: ProducerBatchStaticP<RunnerP<Ctx, Res>>[], filters: FilterP<RunnerP<Ctx, Res>>[] = [], estimators: EstimatorP<RunnerP<Ctx, Res>, BigNumber>[] = [], error?: CageP<Err>) {
  return (await ensureOneP(producers, filters, estimators, error))(context)
}

export async function runOneWrappedP<Ctx, Res, Opt extends Option<RunnerP<Ctx, Res>>, Err extends Caged = Error>(context: Ctx, producers: ProducerBatchStaticP<Opt>[], filters: FilterP<Opt>[] = [], estimators: EstimatorP<Opt, BigNumber>[] = [], error?: CageP<Err>) {
  return (await ensureOneWrappedP<RunnerP<Ctx, Res>, Opt, Err>(producers, filters, estimators, error))(context)
}

export async function runOneStaticP<Ctx, Res, Err extends Caged = Error>(context: Ctx, runners: RunnerP<Ctx, Res>[], filters: FilterP<RunnerP<Ctx, Res>>[] = [], estimators: EstimatorP<RunnerP<Ctx, Res>, BigNumber>[] = [], error?: CageP<Err>) {
  return (await ensureOneStaticP(runners, filters, estimators, error))(context)
}

/**
 * Doesn't allow specifying extra properties
 */
export async function runOneWrappedStaticP<Ctx, Res, Opt extends Option<RunnerP<Ctx, Res>>, Err extends Caged = Error>(context: Ctx, options: Opt[], filters: FilterP<Opt>[] = [], estimators: EstimatorP<Opt, BigNumber>[] = [], error?: CageP<Err>) {
  return (await ensureOneWrappedStaticP<RunnerP<Ctx, Res>, Opt, Err>(options, filters, estimators, error))(context)
}

export async function runOneStaticFinalP<Ctx, Val>(context: Ctx, runner: RunnerP<Ctx, Val>, runners: RunnerP<Ctx, Val>[], filters: FilterP<RunnerP<Ctx, Val>>[] = [], estimators: EstimatorP<RunnerP<Ctx, Val>, BigNumber>[] = []) {
  return (await ensureOneStaticFinalP(runner, runners, filters, estimators))(context)
}

export async function runManyStaticP<Ctx, Val>(context: Ctx, runners: RunnerP<Ctx, Val>[], filters: FilterP<RunnerP<Ctx, Val>>[] = [], estimators: EstimatorP<RunnerP<Ctx, Val>, BigNumber>[] = []) {
  const $runners = await chooseManyStaticP(runners, filters, estimators)
  return together($runners, context)
}

export async function runManySeqConcatP<Context, Result>(context: Context, runners: RunnerP<Context, Result[]>[], filters: FilterP<RunnerP<Context, Result[]>>[] = [], estimators: EstimatorP<RunnerP<Context, Result[]>, BigNumber>[] = []) {
  const $runners = await chooseManyStaticP(runners, filters, estimators)
  return $runners.reduce(async (values, runner) => {
    const valuesOld = await values
    const valuesNew = await runner(context)
    return valuesOld.concat(valuesNew)
  }, Promise.resolve<Result[]>([]))
}

export async function runManyWrappedSeqConcatP<Ctx, Res>(context: Ctx, options: Option<RunnerP<Ctx, Res[]>>[], filters: FilterP<Option<RunnerP<Ctx, Res[]>>>[] = [], estimators: EstimatorP<Option<RunnerP<Ctx, Res[]>>, BigNumber>[] = []) {
  const $options = await chooseManyStaticP(options, filters, estimators)
  return $options.reduce(async (values, runner) => {
    const valuesOld = await values
    const valuesNew = await runner.value(context)
    return valuesOld.concat(valuesNew)
  }, Promise.resolve<Res[]>([]))
}

export async function ensureOneStaticFinalP<Val>(value: Val, values: Val[], filters: FilterP<Val>[] = [], estimators: EstimatorP<Val, BigNumber>[] = []) {
  return value // ?? await chooseOneStatic(values, filters, estimators)
}

export function chooseOneStatic<Val>(values: Val[], filters: Filter<Val>[] = [], estimators: Estimator<Val, BigNumber>[] = []) {
  return chooseOne([() => values], filters, estimators)
}

export function ensureOneStatic<Val, Err extends Caged = Error>(values: Val[], filters: Filter<Val>[] = [], estimators: Estimator<Val, BigNumber>[] = [], error?: Cage<Err>) {
  return ensure(chooseOneStatic(values, filters, estimators), error)
}

export async function chooseOneWrappedStatic<Val, Opt extends Option<Val> = Option<Val>>(values: Opt[], filters: Filter<Opt>[] = [], estimators: Estimator<Opt, BigNumber>[] = []) {
  return chooseOneWrapped<Opt['value'], Opt>([() => values], filters, estimators)
}

export function ensureOneWrappedStatic<Val, Opt extends Option<Val> = Option<Val>, Err extends Caged = Error>(values: Opt[], filters: Filter<Opt>[] = [], estimators: Estimator<Opt, BigNumber>[] = [], error?: Cage<Err>) {
  return ensure(chooseOneWrapped<Opt['value'], Opt>([() => values], filters, estimators), error)
}

export function ensureOneWrappedSimpleStatic<Val, Opt extends Option<Val> = Option<Val>, Err extends Caged = Error>(values: Opt[], filter: Filter<Opt> = AlwaysTrue, estimator: Estimator<Opt, BigNumber> = AlwaysOne, error?: Cage<Err>) {
  return ensure(chooseOneWrappedSimple<Opt['value'], Opt>([() => values], filter, estimator), error)
}

export async function chooseOneStaticP<Val>(values: Val[], filters: FilterP<Val>[] = [], estimators: EstimatorP<Val, BigNumber>[] = []) {
  return chooseOneP([async () => values], filters, estimators)
}

export async function chooseOneWrappedStaticP<Val, Opt extends Option<Val> = Option<Val>>(values: Opt[], filters: FilterP<Opt>[] = [], estimators: EstimatorP<Opt, BigNumber>[] = []) {
  return chooseOneWrappedP<Opt['value'], Opt>([async () => values], filters, estimators)
}

export async function ensureOneStaticP<Val, Err extends Caged = Error>(values: Val[], filters: FilterP<Val>[] = [], estimators: EstimatorP<Val, BigNumber>[] = [], error?: CageP<Err>) {
  return ensureP(await chooseOneStaticP(values, filters, estimators), error)
}

export async function ensureOneWrappedStaticP<Val, Opt extends Option<Val> = Option<Val>, Err extends Caged = Error>(options: Opt[], filters: FilterP<Opt>[] = [], estimators: EstimatorP<Opt, BigNumber>[] = [], error?: CageP<Err>) {
  return ensureP(await chooseOneWrappedStaticP<Opt['value'], Opt>(options, filters, estimators), error)
}

export async function chooseOneSimpleStaticP<Val>(values: Val[], filter: FilterP<Val> = AlwaysTrueP, estimator: EstimatorP<Val, BigNumber> = AlwaysOneP) {
  return chooseOneP([async () => values], [filter], [estimator])
}

export function chooseOneWrappedSimpleStatic<Val, Opt extends Option<Val> = Option<Val>, Err extends Caged = Error>(values: Opt[], filter: Filter<Opt> = AlwaysTrue, estimator: Estimator<Opt, BigNumber> = AlwaysOne) {
  return chooseOneWrappedSimple<Opt['value'], Opt>([() => values], filter, estimator)
}

export function chooseOneSimpleStatic<Val>(values: Val[], filter: Filter<Val> = AlwaysTrue, estimator: Estimator<Val, BigNumber> = AlwaysOne) {
  return chooseOne([() => values], [filter], [estimator])
}

export async function ensureOneSimpleStaticP<Val, Err extends Caged = Error>(values: Val[], filter: FilterP<Val> = AlwaysTrueP, estimator: EstimatorP<Val, BigNumber> = AlwaysOneP, error?: CageP<Err>) {
  return ensureP(await chooseOneSimpleStaticP(values, filter, estimator), error)
}

export function ensureOneSimpleStatic<Val, Err extends Caged = Error>(values: Val[], filter: Filter<Val> = AlwaysTrue, estimator: Estimator<Val, BigNumber> = AlwaysOne, error?: Cage<Err>) {
  return ensure(chooseOneSimpleStatic(values, filter, estimator), error)
}

export function chooseOne<Val>(producers: ProducerBatchStatic<Val>[], filters: Filter<Val>[] = [], estimators: Estimator<Val, BigNumber>[] = []): Val | undefined {
  return chooseMany(producers, filters, estimators)[0]
}

export async function chooseOneP<Val>(producers: ProducerBatchStaticP<Val>[], filters: FilterP<Val>[] = [], estimators: EstimatorP<Val, BigNumber>[] = []): Promise<Val | undefined> {
  return (await chooseManyP(producers, filters, estimators))[0]
}

export function chooseOneWrapped<Val, Opt extends Option<Val> = Option<Val>>(producers: ProducerBatchStatic<Opt>[], filters: Filter<Opt>[] = [], estimators: Estimator<Opt, BigNumber>[] = []): Val | undefined {
  return chooseManyWrapped<Opt['value'], Opt>(producers, filters, estimators)[0]
}

export function chooseOneWrappedSimple<Val, Opt extends Option<Val> = Option<Val>>(producers: ProducerBatchStatic<Opt>[], filter: Filter<Opt> = AlwaysTrue, estimator: Estimator<Opt, BigNumber> = AlwaysOne): Val | undefined {
  return chooseManyWrappedSimple<Opt['value'], Opt>(producers, filter, estimator)[0]
}

export function ensureOneWrapped<Val, Opt extends Option<Val> = Option<Val>, Err extends Caged = Error>(producers: ProducerBatchStatic<Opt>[], filters: Filter<Opt>[] = [], estimators: Estimator<Opt, BigNumber>[] = [], error?: Cage<Err>): Val | undefined {
  return ensure(chooseOneWrapped(producers, filters, estimators), error)
}

export async function chooseOneWrappedP<Val, Opt extends Option<Val> = Option<Val>>(producers: ProducerBatchStaticP<Opt>[], filters: FilterP<Opt>[] = [], estimators: EstimatorP<Opt, BigNumber>[] = []): Promise<Val | undefined> {
  return (await chooseManyWrappedP<Opt['value'], Opt>(producers, filters, estimators))[0]
}

export async function ensureOneP<Val, Err extends Caged = Error>(producers: ProducerBatchStaticP<Val>[], filters: FilterP<Val>[] = [], estimators: EstimatorP<Val, BigNumber>[] = [], error?: CageP<Err>): Promise<Val> {
  return ensureP(await chooseOneP(producers, filters, estimators), error)
}

export async function ensureOneWrappedP<Val, Opt extends Option<Val> = Option<Val>, Err extends Caged = Error>(producers: ProducerBatchStaticP<Opt>[], filters: FilterP<Opt>[] = [], estimators: EstimatorP<Opt, BigNumber>[] = [], error?: CageP<Err>): Promise<Val> {
  return ensureP(await chooseOneWrappedP(producers, filters, estimators), error)
}

export async function chooseManyStaticP<Val>(values: Val[], filters: FilterP<Val>[] = [], estimators: EstimatorP<Val, BigNumber>[] = []) {
  return (await toEstimatedOptionsStaticP(values, filters, estimators))
    .sort(byEstimate)
    .map(toValue)
}

export async function chooseManyP<Val>(producers: ProducerBatchStaticP<Val>[], filters: FilterP<Val>[] = [], estimators: EstimatorP<Val, BigNumber>[] = []) {
  return (await toEstimatedOptionsP(producers, filters, estimators))
    .sort(byEstimate)
    .map(toValue)
}

export async function chooseManyWrappedP<Val, Opt extends Option<Val> = Option<Val>>(producers: ProducerBatchStaticP<Opt>[], filters: FilterP<Opt>[] = [], estimators: EstimatorP<Opt, BigNumber>[] = []): Promise<Val[]> {
  return (await chooseManyP<Opt>(producers, filters, estimators)).map(toValue)
}

export function chooseMany<Val>(producers: ProducerBatchStatic<Val>[], filters: Filter<Val>[] = [], estimators: Estimator<Val, BigNumber>[] = []) {
  return toEstimatedOptions(producers, filters, estimators)
    .sort(byEstimate)
    .map(toValue)
}

export function chooseManyWrapped<Val, Opt extends Option<Val> = Option<Val>>(producers: ProducerBatchStatic<Opt>[], filters: Filter<Opt>[] = [], estimators: Estimator<Opt, BigNumber>[] = []): Val[] {
  return chooseMany<Opt>(producers, filters, estimators).map(toValue)
}

export function chooseManyWrappedSimple<Val, Opt extends Option<Val> = Option<Val>>(producers: ProducerBatchStatic<Opt>[], filter: Filter<Opt> = AlwaysTrue, estimator: Estimator<Opt, BigNumber> = AlwaysOne): Val[] {
  return chooseMany<Opt>(producers, [filter], [estimator]).map(toValue)
}

export function chooseManyWrappedSimpleStatic<Val, Opt extends Option<Val> = Option<Val>, Err extends Caged = Error>(values: Opt[], filter: Filter<Opt> = AlwaysTrue, estimator: Estimator<Opt, BigNumber> = AlwaysOne) {
  return chooseManyWrappedSimple<Opt['value'], Opt>([() => values], filter, estimator)
}

export function chooseManyStatic<Val>(values: Val[], filters: Filter<Val>[] = [], estimators: Estimator<Val, BigNumber>[] = []) {
  return toEstimatedOptionsStatic(values, filters, estimators)
    .sort(byEstimate)
    .map(toValue)
}

export function chooseManyWrappedStatic<Val, Opt extends Option<Val> = Option<Val>>(options: Opt[], filters: Filter<Opt>[] = [], estimators: Estimator<Opt, BigNumber>[] = []): Val[] {
  return chooseMany<Opt>([() => options], filters, estimators).map(toValue)
}

export function chooseManySimpleStatic<Val>(values: Val[], filter: Filter<Val> = AlwaysTrue, estimator: Estimator<Val, BigNumber> = AlwaysOne) {
  return chooseManyStatic(values, [filter], [estimator])
}

export function chooseManyPreparedStatic<Val>(options: OptionF<Val>[]) {
  return options.filter(isValid).map(toValue)
}

export function chooseOnePreparedStatic<Val>(options: OptionFE<Val, BigNumber>[]): Val | undefined {
  const option = [...options].filter(isValid).sort(byEstimate)[0]
  return option ? option.value : undefined
}

export function ensureOneStaticBrainstorm<Val, Err extends Caged = Error>(options: OptionFE<Val, BigNumber>[], error?: Cage<Err>) {
  return ensure(chooseOnePreparedStatic(options), error)
}

export async function toEstimatedOptionsP<Val>(producers: ProducerBatchStaticP<Val>[], filters: FilterP<Val>[], estimators: EstimatorP<Val, BigNumber>[]): Promise<OptionE<Val, BigNumber>[]> {
  return flatten(await parallel(producers.map(async producer => toEstimatedOptionsStaticP(await producer(), filters, estimators))))
}

export async function toEstimatedOptionsStaticP<Val>(values: Val[], filters: FilterP<Val>[], estimators: EstimatorP<Val, BigNumber>[]): Promise<OptionE<Val, BigNumber>[]> {
  return (await parallel(values.map(value => toEstimatedOptionP(filters, estimators, value)))).filter(isDefined)
}

export function toEstimatedOptions<Val>(producers: ProducerBatchStatic<Val>[], filters: Filter<Val>[], estimators: Estimator<Val, BigNumber>[]): OptionE<Val, BigNumber>[] {
  return flatten(producers.map(producer => toEstimatedOptionsStatic(producer(), filters, estimators)))
}

export function toEstimatedOptionsStatic<Val>(values: Val[], filters: Filter<Val>[], estimators: Estimator<Val, BigNumber>[]): OptionE<Val, BigNumber>[] {
  return values.map(value => toEstimatedOption(filters, estimators, value)).filter(isDefined)
}

export async function toEstimatedOptionP<Val>(filters: FilterP<Val>[], estimators: EstimatorP<Val, BigNumber>[], value: Val): Promise<OptionE<Val, BigNumber> | undefined> {
  // combined filtering + estimating for improved performance
  if (await andP(filters)(value)) {
    return {
      value,
      estimate: await getEstimateP(estimators, value),
    }
  }
}

export function toEstimatedOption<Val>(filters: Filter<Val>[], estimators: Estimator<Val, BigNumber>[], value: Val): OptionE<Val, BigNumber> | undefined {
  // combined filtering + estimating for improved performance
  if (and(filters)(value)) {
    return {
      value,
      estimate: getEstimate(estimators, value),
    }
  }
}

export async function getEstimateP<Val>(estimators: EstimatorP<Val, BigNumber>[], value: Val) {
  return (await parallel(estimators.map(e => e(value))))
    .reduce(function (result, estimate) {
      return result.multipliedBy(estimate)
    }, num(1))
}

export function getEstimate<Val>(estimators: Estimator<Val, BigNumber>[], value: Val) {
  return estimators.map(e => e(value))
    .reduce(function (result, estimate) {
      return result.multipliedBy(estimate)
    }, num(1))
}

export function byEstimate(a: Estimated<BigNumber>, b: Estimated<BigNumber>) {
  // high values first
  return b.estimate.minus(a.estimate).toNumber()
}

export const byEstimatorBigNum = <T>(estimator: EstimatorBigNum<T>) => (a: T, b: T) => {
  // high values first
  return estimator(b).minus(estimator(a)).toNumber()
}

export function toValue<Val>(option: Valued<Val>) {
  return option.value
}

export function isValid<Val>(option: Filtered) {
  return option.isValid
}
