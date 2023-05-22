import { parallel } from 'libs/utils/promise'
import { taskP } from '../../src/task'

export async function improveDecimaker() {
  return parallel([
    taskP('Ponder on "default-first" algorithms', `
      Outline:
      * It's possible to write an algorithm where every decision point is replaced with a default decision (short-circuit)
      * Such algorithm will inefficient for high number of runs, but efficient for low number of runs
      
      Examples:
      * "Find a freelancer" options
        * "Act-first"
          * For each freelance marketplace
            * Write a job post for this marketplace
              * If necessary, copy the snippets from previous job posts
        * "Research-first"
          * For each freelance marketplace
            * Update the model of the job post
            * Implement a function from a generic job post to specific job post for this marketplace
          * Write a generic job post
          * For each freelance marketplace
            * Publish the job post
    `),
    taskP('Decide how to get execution statistics', `
      * Pending actions can be pending forever
      * Need to wait until each experiment has run at least \`limit\` times
      * Incorporate pendings into the analysis
      * Switch to allocating finite resources instead of finite number of times
        * Notes
          * Pendings of the first runner have more time to resolve
      * Assume that \`limit\` is the number of pending actions
      * Need to balance isolation (statistical power) with resources
    `),
    taskP('Explore the idea of progressive increase in model complexity', `
      How to choose a model?
      
      * Start from the simplest model
      * Calculate its error rate
      * Calculate the cost of execution
      * Calculate the cost of failure
      * Calculate the profit of success
      * Design a more complex model
      * Calculate its profitability using the same algorithm
      
      Change the model if:
      * New model has a higher profit at the same or lower cost
      * New model has a much higher profit at the little bit higher cost
    `),
    taskP('Unify Decimaker/algorithms and Decimaker/models/Choose'),
    taskP('Decide on Option vs Value', `
      Options:
      * Replace with Input, Output
        * Consistent with functions that take a mapper argument
        * Confusing for beginners
      * Use Option for inputs, rename Option to Box
      
      Semi-options:
      * Use abbreviations for type names
        * Examples
          * VFE for Valued Filtered Estimated
    `),
    taskP('Reconcile separate locators & descriptors', `
      We want to avoid the duplication of locators & descriptors (just have a list of options)
      We want to avoid the duplication of schema property names & z.object keys
      
      Notes:
      * May require back-and-forth between options and schema
        * That's OK as long as type correctness is maintained? 
    `),
    taskP('Fix the bug in parse()', `
      Must display an error if some keys are missing
    `),
    taskP('Optimize the function getters', `
      Problems:
      * Currently requires a separate map
      
      Options:
      * Just use ensureOneStatic
      * Write a function from { func: ... } to { name: ... }, get the index, then back again
    `),
    taskP('Ponder on: separate the tests and the implementations', `
      Inspired by: https://www.tweag.io/blog/2022-01-19-why-liquid-haskell/
      
      Option:
      * Encode the function specification using the type system (more code, hard to read)
      * Encode the function specification using a refinement type (less code, easy to read)
      * Encode the function specification using a test (even less code, even easier to read)
      
      Notes:
      * A pair of implementation + test is better
        * Less code
        * Higher performance
        * Lower assurance
          * Examples
            * What if the test doesn't check a specific edge case?
    `),
  ])
}

export async function improveDecimakerStage2() {
  return parallel([
    taskP('How to ensure the schema properties are orthogonal?', `
      * Not required - just makes it harder to write filters
      * May keep properties that are related in a single option but independent across multiple options (e.g. price & quality, weight & volume)
    `),
  ])
}

export async function getDoNotRepeatMistakesIdea() {
  const description = `
    * Most problems can be solved via trial-and-error (continuous production of ideas, "resourcefulness")
    * Some problems are not solved via trial-and-error (e.g. relationships)
    * Some problems can't be solved via trial-and-error (e.g. trading)
    
    Maybe those that can't be solved can be solved by modifying the policy using rules that arise from failures?
      * But how do you know that the filter is correct? 
        * Examples:
          * How do you know that adding a stop-loss actually improves the expectation of profit? 
      * But how do you parametrize the filters?
        * Examples
          * Where exactly should you place a stop-loss?
            * This gets us back to formalization as a solution
  `
}
