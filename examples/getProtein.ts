import { stub } from 'libs/utils/todo'
import { get_greedy_Producer_Reducer } from '../algorithms/get__greedy__batch_producer__reducer'
import { getProducerBuilder } from '../getProducerBuilder'
import { Reducer } from '../models/Reducer'
import { google } from '../producers/builders/google'
import { lazada } from '../producers/builders/lazada'

interface Protein {
  pricePerGram: number
  hasSugar: boolean
}

/**
 * Outline:
 * - I am choosing the protein powder for the first time in my life
 * - I have bought many products before from Lazada
 * - I have googled many times
 *
 * Feedback:
 * - It was confusing to determine filter.isStatic
 * - It was confusing to determine *.isInformedByExperience - what if I have chosen products before, but haven't chosen proteins before?
 */
export async function getProtein() {
  return get_greedy_Producer_Reducer<Protein>(getProducerBuilder({
    isStatic: false,
    isFinite: true,
    isCheap: true,
    isProgressivelyExpensive: false,
    isComposite: true,
    isInformedByExperience: true,
    batchSize: 5,
  })([
    lazada('protein'),
    google('buy protein thailand'),
  ]), getReducer())
}

function getReducer() {
  return stub<Reducer<Protein>>()
  // return getReducerBuilder<Protein>({
  //   isStatic: false,
  //   isComposite: true,
  //   isCheap: isCheap({ isProgrammatic: true }),
  //   isInformedByExperience: false,
  //   isProgressivelyExpensive: false,
  //   mostOptionsAre: 'positive',
  // })([
  //   async function (options) {
  //
  //   },
  // ])
}
