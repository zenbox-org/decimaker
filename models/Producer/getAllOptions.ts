import { identity } from 'lodash-es'
import { Producer, ProducerBP } from '../Producer'
import { flatMapP } from './flatMapP'
import { map } from './map'

export async function getAllValuesBP<Val>(producer: ProducerBP<Val>) {
  return flatMapP<Val, Val>(producer, identity)
}

export async function getAllValues<Val>(producer: Producer<Val>) {
  return map<Val, Val>(producer, identity)
}

export const exhaustBP = getAllValuesBP

export const exhaust = getAllValues
