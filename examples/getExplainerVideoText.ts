import { strict as assert } from 'assert'
import { todo } from 'libs/utils/todo'
import { z } from 'zod'
import { getNameFromFunction } from '../../../utils/getNameFromFunction'
import { get_greedy_Schema_Producer_Reducer } from '../algorithms/get__greedy__batch_producer__reducer'
import { settle } from '../get'
import { getSchemaBuilder } from '../getters/getSchemaBuilderFromHints'

export const explainerVideoText = settle(`
Are you a social media influencer? Do you want to make money? You can try Fairpool!

Fairpool is an application that allows you to create a personal token. You can sell this token to your followers. Also, you will get paid every time your token is traded. It's a permanent revenue stream!

You can make your token valuable by selling premium content for it, or providing access to a private group. This way, your token becomes a ticket into your world, which makes it attractive to your followers.

Creating a token is legal and free. Just publish a link to your token page on your social media, and get revenue from every trade.

Curious to learn more? Check out our website at fairpool.io.

Fairpool.io - create a personal token now!
`, getExplainerVideoText)

export async function getExplainerVideoText() {
  const name = getNameFromFunction(getExplainerVideoText)
  assert.equal(name, 'ExplainerVideoText')
  const getSchema = getSchemaBuilder(true, false)
  const schema = getSchema([
    'https://optemization.com/hivemind?ref=producthunt',
    'https://www.youtube.com/watch?v=bmAQKbdVXNk', // very professional
    'https://www.youtube.com/watch?v=0URuIXEpCJQ',
    'https://www.youtube.com/watch?v=EHpC85KjoH4',
    'https://www.youtube.com/watch?v=-bknuFCQn4Y',
    'https://youtu.be/i_1DwHrf8GY',
    'https://youtu.be/ykwE7PsCMPI',
  ], todo(z.object({})), todo())
  return get_greedy_Schema_Producer_Reducer(
    schema,
    todo(),
    todo(),
  )
}
