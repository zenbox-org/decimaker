import { Caged, CageP } from 'libs/utils/cage'
import { ensureFind } from 'libs/utils/ensure'
import { isEqualDC } from 'libs/utils/lodash'
import { todo } from 'libs/utils/todo'
import { every } from 'lodash-es'
import { Description } from '../generic/models/Description'
import { $ts } from '../generic/models/Thought'
import { get_greedy_Producer_Reducer, get_greedy_Schema_Producer_Reducer } from './algorithms/get__greedy__batch_producer__reducer'
import { get_greedy_Schema_Filter_Producer } from './algorithms/get_greedy__filter__producer'
import { get_greedy_Filters_Producers } from './algorithms/get_greedy__filters__producers'
import { getFirstAcceptableStaticSync } from './algorithms/getFirstAcceptableStatic'
import { canBuyOverpricedProduct, canBuyProductNotMatchingRequirements, canBuyProductThatWillNotBeDelivered, canBuyProductWithVeryBadReviews, canForgetImportantCriteria, canSpendTooMuchTimeSearchingForNonExistentProduct } from './data/allRisks'
import { getProtein } from './examples/getProtein'
import { btosNo, btosYes } from './models/BooleanThoughtOption'
import { Option } from './models/Option'
import { ProducerBP } from './models/Producer'
import { Reducer } from './models/Reducer'
import { Risk } from './models/Risk'

/**
 * Each step can be modelled as a constructor of a type in a DT language
 *
 * We need both the filter and the estimator:
 * - We need the filter to throw an error if we can't find a good option in a complete list of options
 * - We need the estimator to select the best option in a batch of options
 */
export interface FunCtx<Option> {
  isStatic: boolean // you know all input-output pairs, so you can construct the function from a static list of input-output pairs
  isComposite: boolean // the person can implement the function as a composition of other functions of the same type
  isInformedByExperience: boolean // the person has enough input-output pairs in his mind (the person has enough experience to implement it)
  isCheap: boolean // the person can execute the function cheaply
  isProgressivelyExpensive: boolean // the person has to pay more for each subsequent execution
}

export interface FilterConfig<Option> extends FunCtx<Option> {

}

export interface EstimatorConfig<Option> extends FunCtx<Option> {
  isDispersionSmall: boolean
}

export async function getter<Option>(producer: ProducerBP<Option>, reducer: Reducer<Option>) {
  return async function () {
    return get_greedy_Producer_Reducer<Option>(producer, reducer)
  }
}

/**
 * Batch size can be reduced to 1 if option production cost is high
 * If there are no acceptable options, the exception must be handled by a higher-level function
 */
export const get = settle(get_greedy_Filters_Producers, getMasterGetter)

type BaseType = 'Schema' | 'Producer' | 'Reducer' | 'Filter' | 'Estimator' | 'Error'

interface GetterArg {
  type: BaseType,
  isArray: boolean
}

const schema: GetterArg = { type: 'Schema', isArray: false }
const schemas: GetterArg = { type: 'Schema', isArray: true }
const producer: GetterArg = { type: 'Producer', isArray: false }
const producers: GetterArg = { type: 'Producer', isArray: true }
const reducer: GetterArg = { type: 'Reducer', isArray: false }
const reducers: GetterArg = { type: 'Reducer', isArray: true }
const filter: GetterArg = { type: 'Filter', isArray: false }
const filters: GetterArg = { type: 'Filter', isArray: true }
const estimator: GetterArg = { type: 'Estimator', isArray: false }
const estimators: GetterArg = { type: 'Estimator', isArray: true }
const error: GetterArg = { type: 'Error', isArray: false }
const errors: GetterArg = { type: 'Error', isArray: true }

// eslint-disable-next-line @typescript-eslint/ban-types
interface MasterGetterOption extends Option<Function> {
  isGreedy: boolean // returns early if it finds a suitable option
  args: GetterArg[]
}

async function getMasterGetter() {
  const options = todo<MasterGetterOption[]>([
    {
      value: get_greedy_Filters_Producers,
      isGreedy: true,
      args: [filters, producer],
    },
    {
      value: get_greedy_Schema_Filter_Producer,
      isGreedy: true,
      args: [schema, filter, producer],
    },
    {
      value: get_greedy_Producer_Reducer,
      isGreedy: true,
      args: [producer, reducer],
    },
    {
      value: get_greedy_Schema_Producer_Reducer,
      isGreedy: true,
      args: [schema, producer, reducer],
    },
  ], 'Add more options from Decimaker/algorithms folder')
  return ensureFind(options, o => every([
    o.isGreedy,
    filterArgs(o.args),
  ])).value
}

function filterArgs(args: GetterArg[]) {
  return every([
    filterPresence(args, schema, requiresSchema()),
    filterPresence(args, { type: 'Filter', isArray: isFilterArray() }, true),
    filterPresence(args, producer, todo(true)),
    filterPresence(args, error, true),
  ])
}

function filterPresence(args: GetterArg[], arg: GetterArg, isRequired: boolean) {
  const isFound = !!args.find(isEqualDC(arg))
  return isFound === isRequired
}

function isFilterArray() {
  return btosNo([

  ], [
    ['Can replace an array with every(...)', [
      ['And also less code'],
    ]],
  ])
}

function throwsOptionNotFound() {
  const allowSystem = $ts([
    'Allow throwing an OptionNotFound exception',
    'Allow handling of exception in the calling code',
  ])
  const disallowSystem = $ts([
    'Disallow throwing the OptionNotFound exception',
    ['Require to always provide an estimator', [
      'But can not do it immediately when writing a function',
    ]],
  ])
  const pros = $ts([
    ['System', allowSystem],
    ['Discussion', [
      'Inaction (aka "wait" action) is always available as a meta-option',
    ]],
  ])
  const cons = $ts([
    ['System', disallowSystem],
    ['Discussion', [
      ['If you have a deadline, you are forced to take at least one option', [
        ['Examples', [
          ['If you need to eat, you need to find some food', [
            ['But you cannot eat stones', [
              ['The system must be able to throw an OptionNotFound'],
            ]],
          ]],
        ]],
      ]],
    ]],
  ])
  return btosYes(pros, cons)
}

function requiresSchema() {
  return btosNo([
    ['Every getter requires the thinker to specify the type', [
      'But thinker can specify the type by calling getFilters and passing schema to that function',
    ]],
    ['The thinker may call getSchema for help'],
  ], [
    ['Schema argument is not used in the function - this points to the fact that schema is necessary in some other function'],
  ])
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AsyncFunction = (...args: any[]) => Promise<unknown>

type Example = AsyncFunction

type Algorithm = AsyncFunction

interface ApplicabilityForExample {
  example: Example
  risks: Risk[]
  applicabilities: Applicability[]
}

interface Applicability {
  algorithm: Algorithm
  isApplicable: boolean
  reasons: Description
}

const applicabilitiesForExamples: ApplicabilityForExample[] = [
  {
    example: getProtein,
    risks: [
      canBuyOverpricedProduct,
      canBuyProductWithVeryBadReviews,
      canBuyProductNotMatchingRequirements,
      canBuyProductThatWillNotBeDelivered,
      canSpendTooMuchTimeSearchingForNonExistentProduct,
      canForgetImportantCriteria,
    ],
    applicabilities: [
      {
        algorithm: getFirstAcceptableStaticSync,
        isApplicable: false,
        reasons: '',
      },
    ],
  },
]

/**
 * Used to link the final option to the getter
 */
export function settle<Option extends Caged>(option: Option, getter: CageP<Option>): Option {
  return option
}
