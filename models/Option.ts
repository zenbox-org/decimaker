import { Estimated } from '../interfaces/Estimated'
import { Filtered } from '../interfaces/Filtered'
import { Gauged } from '../interfaces/Gauged'
import { Noted } from '../interfaces/Noted'
import { Timestamped } from '../interfaces/Timestamped'
import { Valued } from '../interfaces/Valued'

export interface Option<Val> extends Valued<Val> {}

export interface OptionN<Val> extends Option<Val>, Noted {}

export interface OptionT<Val> extends Option<Val>, Timestamped {}

export interface OptionF<Val> extends Valued<Val>, Filtered {}

export interface OptionFE<Val, Num> extends Valued<Val>, Filtered, Estimated<Num> {}

export interface OptionFT<Val> extends Valued<Val>, Filtered, Timestamped {}

export interface OptionE<Val, Num> extends Valued<Val>, Estimated<Num> {}

export interface OptionET<Val, Num> extends Valued<Val>, Estimated<Num>, Timestamped {}

export interface OptionG<Val, Stat> extends Valued<Val>, Gauged<Stat> {}
