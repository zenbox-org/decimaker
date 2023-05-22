import { ProducerBatchC, ProducerBatchCP } from '../Producer'

export const withContextProducerC = <Ctx>(context: Ctx) => <Opt>(producer: ProducerBatchC<Opt, Ctx>) => function * () {
  for (const options of producer(context)) {
    yield options
  }
}

export const withContextProducerCP = <Ctx>(context: Ctx) => <Opt>(producer: ProducerBatchCP<Opt, Ctx>) => async function * () {
  for await (const options of producer(context)) {
    yield options
  }
}

export const withContextProducersC = <Ctx, Opt>(context: Ctx, producers: ProducerBatchC<Opt, Ctx>[]) => {
  return producers.map(withContextProducerC(context))
}

export const withContextProducersCP = <Ctx, Opt>(context: Ctx, producers: ProducerBatchCP<Opt, Ctx>[]) => {
  return producers.map(withContextProducerCP(context))
}
