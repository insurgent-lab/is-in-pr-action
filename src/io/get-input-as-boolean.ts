import {getInput} from '@actions/core'

export default function getBooleanInput(
  name: string,
  defaultValue: boolean
): boolean {
  const param = getInput(name)
  if (param === 'true' || param === '1') {
    return true
  } else if (param === 'false' || param === '0') {
    return false
  } else return defaultValue
}
