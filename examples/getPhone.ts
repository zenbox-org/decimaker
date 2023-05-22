import { stub } from 'libs/utils/todo'
import { get_greedy_Producer_Reducer } from '../algorithms/get__greedy__batch_producer__reducer'

interface Phone {}

const phone = get_greedy_Producer_Reducer<Phone>(stub(), stub())
