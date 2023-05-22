import { $ts } from '../../generic/models/Thought'

export type Strategy = <Ctx, Bat, Res>(context: Ctx, batch: Bat) => Promise<Res>

export function getStrategySelector() {
  const thoughts = $ts([
    ['Strategies must be executed in batches'],
    ['Strategies take resources as inputs'],
    ['Strategies must change between executions', [
      ['Strategies should incorporate the learnings from the previous executions'],
    ]],
    ['It is impossible to build an environment model in appropriate time'],
    ['It is possible to write statements about the environment model in appropriate time', [
      ['Examples', [
        ['We know that startup returns follow a power-law distribution'],
        ['We know that marketplaces are "harder" to get started than non-marketplaces'],
        ['We know that it is necessary for founders to speak with customers to understand their needs'],
      ]],
    ]],
  ])
}
