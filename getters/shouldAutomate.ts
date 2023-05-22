/**
 * Notes:
 * - If you can't calculate the gains/losses precisely, you can use min gains and max losses
 * @param iterations
 * @param iterationLoss
 * @param iterationSuccessGain
 * @param iterationFailureLoss
 * @param iterationFailureProbability
 * @param implementationLoss
 */
export function shouldAutomate(iterations: number, iterationLoss: number, iterationSuccessGain: number, iterationFailureLoss: number, iterationFailureProbability: number, implementationLoss: number) {
  const iterationSuccessProbability = 1 - iterationFailureProbability
  const executionLoss = iterations * iterationLoss
  const successGain = iterations * iterationSuccessGain * iterationSuccessProbability
  const failureLoss = iterations * iterationFailureLoss * iterationFailureProbability
  const gain = successGain - executionLoss - failureLoss
  return gain > implementationLoss
}
