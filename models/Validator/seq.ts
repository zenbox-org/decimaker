import { ProducerBatchStatic } from '../Producer'

export const seq = <Err>(producers: ProducerBatchStatic<Err>[]): Err[] => {
  for (const producer of producers) {
    const errors = producer()
    if (errors.length) return errors
  }
  return []
}
