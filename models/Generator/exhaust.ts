export const exhaust = <Val, Out = unknown>(generator: Generator<Val, Out, undefined>) => {
  const values: Val[] = []
  for (const value of generator) {
    values.push(value)
  }
  return values
}
