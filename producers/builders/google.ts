import { task } from '../../../../src/task'

export function google<Option>(query: string, results?: Option[]) {
  return async function * () {
    if (!results) throw task(`Google: "${query}"`, `
      https://www.google.com/search?q=${encodeURIComponent(query)}
    `)
    yield results
  }
}
