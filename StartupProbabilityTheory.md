# Startup Probability Theory

## Motivation

`[Anecdote about a physicist and a mathematician]`

We want to make better bets.

There is always a bet to be made.

We don't need to optimize a preconceived reward function: just make better bets.

The reward of one agent is the number of iterations of another agent for the same time period.

## Main idea

We should model measurements as *pairs of values*, not *single values*.

We always need *at least two objects* to make measurements: the object under measure and the instrument of measure (which is also an object, by the way). So the measure is actually an interpretation of the first object in terms of the second object.

However, both objects *may change* during the measurement. To notice such change, we need a third instrument.

(TODO: I'm not sure why we need pairs of values. We do need snapshots though, to minimize the temporal drift)

## Principles

* There is a dataset of "experiments" with timestamps

## Problem

Inputs:

* Plans (non-empty array, at least one "do nothing")
* Histories (array of pairs of starting and stopping states for each operation in the plans) (possibly empty)
* Reward function (from a pair of states to number)

Output type: index of plan to follow

Notes:

* Every operation in the plan changes the state
  * Normally we include both the positive and the negative change (gain & loss)

## Examples

### Multi-armed bandit

Parameters:

* N is the number of arms ("alternatives")
* T_MAX is the amount of time ("budget")
* R_MAX is the maximum reward (experiment is stopped if the returned reward is greater than maximum reward)

Structures:

* Result
  * Arm index is an integer in the range of `[0, N-1]`
  * Reward is a real number in the range of `[0, R_MAX]`
  * Timestamp is an integer in the range of `[0, T_MAX]`

Algorithm:

```typescript
```

## Basic actions

* Add a new metric (increase the number of dimensions) (add a new field to the point structure) (add a new feature)
* Add a new point
* Get a point preimage (data known in advance, observation)
* Get a point image (reward)
* Choose the next point for getting the image

Normally, the "get an image" is hard, while "get a preimage" is easy. That's why we want the ability to predict: to choose the next point for getting the image with the highest expectation of an image value.

Notes:

* Adding a new dimension requires re-measuring this dimension for the previous points. Sometimes this re-measuring can't be done retroactively (i.e. the dimension has changed in the real world, and the old value is not available anymore)
* Adding a new dimension exponentially increases the cost of choosing the next point.
