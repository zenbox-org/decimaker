import { task } from '../../../../src/task'

export function lazada<Value>(query: string, results?: Value[]) {
  return async function * () {
    if (!results) throw task(`Search on Lazada: "${query}"`, `
      https://www.lazada.co.th/catalog/?q=${encodeURIComponent(query)}
    `)
    yield results
  }
}
