import { OptionNotFound } from './tasks'

export function ensureOption<Option>(option: Option | undefined) {
  if (option) return option
  throw OptionNotFound()
}

export async function ensureOptionP<Option>(optionP: Promise<Option | undefined>) {
  return ensureOption(await optionP)
}
