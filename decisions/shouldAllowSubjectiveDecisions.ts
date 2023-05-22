import { chooseOneWrappedSimpleStatic } from 'libs/decimaker/choose'
import { Option } from 'libs/decimaker/models/Option'
import { $ts } from '../../generic/models/Thought'

interface shouldAllowSubjectiveDecisionsOption extends Option<boolean> {

}

export function shouldAllowSubjectiveDecisions() {
  const scenarios = $ts([
    ['Name.isPositive', [
      ['Steps', [
        'I define a function "getName"',
        'I define a type "Name"',
        'I define a projection "isPositive"',
        'I define a function "isPositiveDefinable" as "!!getDefinitionMethodForIsPositive"',
        'I define a function "getDefinitionMethodForIsPositive"',
        'I define methods, but every method requires setup (can produce value only after spending some time on setting it up)',
      ]],
      ['Questions', [
        ['Can I just say that isPositive is definable without defining the method?', [
          ['Notes', [
            'The axiomatization is inherently subjective',
          ]],
        ]],
      ]],
    ]],
  ])
  const options: shouldAllowSubjectiveDecisionsOption[] = [
    {
      value: true,
    },
    {
      value: false,
    },
  ]
  return chooseOneWrappedSimpleStatic(options)
}
