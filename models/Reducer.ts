export type Reducer<Option> = (options: Option[]) => Promise<Option | undefined>

export type Reducers<Option> = Reducer<Option>[]

export type ReducerStrict<Option> = (options: Option[]) => Promise<Option>
