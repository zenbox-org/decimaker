import { stub } from 'libs/utils/todo'
import { ProducerBP } from '../../models/Producer'

/**
 * Ask people
 */
function ask<Option>(query: string) {
  return stub<ProducerBP<Option>>()
}
