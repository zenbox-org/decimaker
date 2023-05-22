import { chooseOneWrappedSimpleStatic } from 'libs/decimaker/choose'
import { Option } from 'libs/decimaker/models/Option'
import { todo } from 'libs/utils/todo'
import { EstimatorBigNum } from '../../generic/models/Estimator'
import { Filter } from '../../generic/models/Filter'
import { $ts } from '../../generic/models/Thought'

interface NameOption extends Option<string> {
  associations: string[]
}

interface Association {
  name: string
  isPositive: boolean
}

export function getName() {
  const options: NameOption[] = [
    {
      value: 'Zenbox',
      associations: ['zen', 'box'],
    },
    {
      value: 'Playbook',
      associations: ['play', 'book'],
    },
    {
      value: 'Decimaker',
      associations: ['decision', 'make'],
    },
  ]
  return chooseOneWrappedSimpleStatic(options, todo<Filter<NameOption>>(), getNameEstimator())
}

function getNameEstimator() {
  const optionDescs = [
    ['Index of a stressed syllable', [
      ['Examples', ['Google', 'Apple', 'Binance']],
      ['Counterexamples', ['Airbnb', 'Y-Combinator', 'Sequoia', 'Bitcoin', 'Bitfinex', 'Uniswap']],
    ]],
  ]
  return todo<EstimatorBigNum<NameOption>>()
}

getNameEstimator.thoughts = $ts([])
