import { stub } from 'libs/utils/todo'
import { get_greedy_Producer_Reducer } from '../algorithms/get__greedy__batch_producer__reducer'

interface FeelGood {}

const good = get_greedy_Producer_Reducer<FeelGood>(stub(), stub())
