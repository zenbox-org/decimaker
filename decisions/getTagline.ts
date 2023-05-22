import { chooseOneWrappedSimpleStatic } from 'libs/decimaker/choose'
import { OptionN } from 'libs/decimaker/models/Option'
import { Filter } from '../../generic/models/Filter'
import { $ts } from '../../generic/models/Thought'
import { todo } from '../../utils/todo'

interface TaglineOption extends OptionN<string> {

}

export function getTagline() {
  const options: TaglineOption[] = [
    {
      value: 'Raise money with recurring trading fees instead of one-time token sale',
    },
    {
      value: 'Raise money without selling your token',
    },
    {
      value: 'Raise money for your community project',
    },
    {
      value: 'Raise money with recurrent investments',
    },
    {
      value: 'Raise money with trading fees',
    },
  ]
  const filter = todo<Filter<TaglineOption>>()
  const filterThoughts = $ts([
    '',
  ])
  return chooseOneWrappedSimpleStatic(options, filter)
}
