import { capitalize } from 'lodash-es'
import { task } from '../../src/task'

export function OptionNotFound() {
  return task('Could not find a suitable option', `
    The producer has been exhausted without finding a suitable option. Suggested fixes:
    * Modify the producer
    * Modify the reducer
  `)
}

export function MustBeComposite(name: string) {
  return task(`${capitalize(name)} must be composite`, `
    If you don't have the experience (can't produce a decent amount of input-output pairs to test the function), then you can't write a ${name}.
    
    If you can't write a ${name} directly, you need to compose it from multiple smaller functions.
    
    Examples:
    * If you haven't chosen a protein powder many times before, you don't have the experience to write a filter. However, if you have chosen other products before, you can reuse your experience of choosing the products to write a filter for a product (e.g. by reviews). However, in this case you need to model the protein powder as a structure with \`product\` field, and implement a filter for that field. If you have many such fields, the filter for the full model can be constructed as a composition of the filters for its fields.
  `)
}

// export function MustBeInformedByExperience() {
//   return task('Producer cannot be created', `
//       If you don't have the experience
//     `)
// }
