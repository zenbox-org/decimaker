import { chooseManyStaticP } from './choose'

export async function getAxioms() {
  return chooseManyStaticP(
    [
      /**
       * The Axiom: "Every axiom implies an author"
       *
       * Alternative formulations:
       * - "Every axiom implies the fact that it has been created by someone or something"
       * - "Every axiom must not contradict the fact that it has been formulated by someone or something"
       * - "Every axiom must be expressible by someone or something"
       * - "Every axiom is an expression of an author"
       * - ∀ a : Axiom, ∃ r : Author
       * - Axiom → Author
       *
       * Consequences:
       * - There is change (required to find the axiom)
       * - There is stability (required to keep the axiom)
       *
       * Consequence alternatives:
       * - An axiom implies the existence of a function (something that represents change)
       * - An axiom implies the existence of a zero (something that represents stability)
       * - An axiom implies the existence of a pair (at least two values are needed to represent instability in a stable way)
       * - An axiom implies the existence of at least 2 terms in the language
       *
       * Hypotheses:
       * - All other types can be built from pairs
       *   - Booleans: empty list is true, other list is false
       *   - Nats: empty list is zero, other list is next (...)
       *   - Trees: lists of lists
       *   - Functions: trees of terms
       *   - Terms: lists of symbols
       *   - Symbols: lists of lists of booleans (matrices of booleans, )
       *
       */
      /**
       * A history of a process does not imply a list of outcomes
       */
    ]
  )
}

export interface Nothing {

}

export interface List<Element> {
  head: Element
  tail: List<Element> | Nothing
}

export type BasicList = List<Nothing>

export interface Constructor {

}

export interface Type {
  name: string
  constructors: Array<Constructor>
  fromList: (list: BasicList) => Constructor
  toList: (constructor: Constructor) => BasicList
}

type Env = Type[]

export function addType(type: Type, env: Env): Env {
  if (!isWellFormed(type)) throw new Error(`Type ${type.name} is not well-formed`)
  return env
}

function isWellFormed(type: Type): boolean {
  // type is well-formed if and only if every value of that type can be represented with one and only one basic list
  return type.constructors.every(constructor => constructor === type.fromList(type.toList(constructor)))
}

/** ** Drafts ** **/

/**
 * Axioms:
 * - Law of conservation of energy
 * - Law of entropy -> A living organism is a system -> A living organism needs external energy to continue living
 */

/**
 * Facts:
 * - Many people died in the past
 *
 * Axioms:
 * - The Deadline Axiom ("We will die sooner or later"): there exists a timestamp after which we will not be able to act
 */

/**
 * Axioms: all axioms from constructive quantum field theory = [Wightman axioms](https://en.wikipedia.org/wiki/Wightman_axioms)
 *
 * Important notes:
 * - We had to choose between two contradicting axiomatic systems: quantum field theory VS general relativity (learn more: [Hilbert's sixth problem status](https://en.wikipedia.org/wiki/Hilbert%27s_sixth_problem#Status)).
 * - We decided to choose quantum field theory over general relativity because there is more evidence that it is correct:
 *   - It already allowed us to build superior tools (quantum computers).
 *   - It studies micro parts of the macro system & normally, micro behavior defines macro behavior
 *  - Most likely, both axiomatic systems are incomplete, but there is a higher chance that quantum field theory will be modified to be "more complete" (at least to describe general relativity).
 */
