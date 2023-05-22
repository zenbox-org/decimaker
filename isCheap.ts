interface IsCheapConfig {
  isProgrammatic: boolean // the person can easily implement the function as a computer program
}

interface ProgrammaticIsCheapConfig extends IsCheapConfig {
  isProgrammatic: true
}

export function isCheap(config: ProgrammaticIsCheapConfig): true

export function isCheap(config: IsCheapConfig) {
  const { isProgrammatic } = config
  if (isProgrammatic) return true
  return manualIsCheap
}

function manualIsCheap(isCheap: boolean) {
  return isCheap
}
