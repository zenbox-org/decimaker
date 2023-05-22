import { Decision } from './Decision'
import { OptionT } from './Option'

export type HasConverged<Val, Dec extends Decision, Opt extends OptionT<Val>> = (decision: Dec, options: Opt[]) => Promise<boolean>
