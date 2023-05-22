# Decimaker

## Principles

* Take the easiest path
  * Ask the questions in the form "Is it easy to ..."
    * Note that "easy" means both "time" and "resource" cost
    * Note that "evaluate" means to "find" or "make"
* Quantify
  * Ask the questions in the form "Are there multiple ..."
* Use [builders](#builder) to avoid delays & mistakes
* Use sequences of builders to split decisions into multiple steps

## Axioms

Test for detachment:

* Do you agree that you should change your behavior according to new observations? (~ update policy from data)
* Do you agree that such change may lead to unacceptable actions? (e.g. killing people, or giving all your money away, or changing your sex, or becoming a monk?)
* Do you agree that such change may counter your limbic system (aka intuition, heart, feelings)?

1. It is possible to objectivize the measurements.
   1. Two people perform a measurement using the same instrument on the same object.
   2. Two people get different results.
   3. The objectivization axiom states that it is possible to find such objects for which the difference between the arithmetic means of results will get progressively smaller with more measurements. In other words, the objectivization axiom simply states the existence of "objects" - things which we can measure objectively (quasi-subjectively).

## Hypotheses

## Using exponent for gain-loss ratio

We should continue using the same strategy if the historical gain-to-loss ratio is higher than exponent.

```typescript
function shouldContinue<T>(gain: T, loss: T, getRatio: (T, T) => number) { 
  return getRatio(gain, loss) > Math.exp(1) 
}
```

Heuristics:

* SaaS advice: LTV / CAC > 3 (which is close to LTV / CAC > e)
* Exponent appears in the formula for compound interest
* Good startups have exponential growth charts (note: need to define growth more precisely)

## Definitions

### Option

A value of the target type.

### Estimate

A value returned by estimator.

### Locator

A string that allows the executor to find an option.

### Descriptor

A string that allows the executor to obtain an option (either find or make).

### Builder

A function that returns a function.

Notes:

* A proper mathematical definition is "Higher-order function"
