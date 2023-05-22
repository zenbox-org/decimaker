import { $ts } from '../../generic/models/Thought'

export function getPlanningApproach() {
  const options = [
    {
      name: 'TopToBottom',
      formulations: $ts([
        ['Make high-level decisions first'],
        ['Choose-implement-execute', [
          ['Choose a function to execute'],
          ['If the function is not implemented: implement it'],
          ['Execute the function'],
        ]],
      ]),
      notes: '',
    },
    {
      name: 'LeftToRight',
    },
  ]
}
