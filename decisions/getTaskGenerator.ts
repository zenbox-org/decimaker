import { todo } from 'libs/utils/todo'
import { AlwaysOne, EstimatorBigNum, TodoEstimatorBigNum } from '../../utils/Estimator'
import { Filter } from '../../utils/Filter'
import { chooseManyWrappedSimpleStatic, chooseManyWrappedStatic, ensureOneStatic } from '../choose'
import { Option } from '../models/Option'
import { allTaskGenerators } from './data/allTaskGenerators'
import { TaskGenerator } from './models/TaskGenerator'

export function getTaskGenerator() {
  return ensureOneStatic(allTaskGenerators, getTaskGeneratorFilters(), getTaskGeneratorEstimators())
}

interface TaskGeneratorFilterOption extends Option<Filter<TaskGenerator>> {
  name: string
  isValid: boolean
  notes?: string
}

function getTaskGeneratorFilters() {
  const options: TaskGeneratorFilterOption[] = [
    {
      name: 'allowsFullControl',
      value: gen => gen.allowsFullControl,
      isValid: false, // 20/80 solution is OK
    },
    {
      name: 'allowsToMakeRigidStrategicDecisions',
      value: gen => gen.allowsToMakeRigidStrategicDecisions,
      notes: `
        * Allows to choose between different high-level strategies depending on the rigid estimators 
          * Rigid estimator is an estimator whose input values are actually hardcoded by the architect (data-as-code)
      `,
      isValid: true,
    },
    {
      name: 'allowsToMakeFlexibleStrategicDecisions',
      value: gen => gen.allowsToMakeFlexibleStrategicDecisions,
      notes: `
        * Allows to choose between different high-level strategies depending on the flexible estimators
          * Flexible estimator is an estimator whose input values come from statistics (data from previous executions)
      `,
      isValid: true,
    },
  ]
  return chooseManyWrappedSimpleStatic<Filter<TaskGenerator>, TaskGeneratorFilterOption>(options, o => o.isValid, AlwaysOne)
}

interface TaskGeneratorEstimatorOption extends Option<EstimatorBigNum<TaskGenerator>> {
  name: string
}

function getTaskGeneratorEstimators() {
  const options: TaskGeneratorEstimatorOption[] = [
    {
      name: 'minimizesTimeCost',
      value: TodoEstimatorBigNum,
    },
  ]
  return chooseManyWrappedStatic<EstimatorBigNum<TaskGenerator>>(options, todo(), todo())
}
