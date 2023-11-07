import * as core from '@actions/core'
import getBooleanInput from './get-input-as-boolean'

type ActionInput = {
  token: string
  sha: string
  includeDraft: boolean
}

export default function getInputs(): ActionInput {
  const token = core.getInput('github-token', {required: true})
  const sha = core.getInput('sha', {required: true})
  const includeDraft = getBooleanInput('includeDraft', true)

  return {
    token,
    sha,
    includeDraft
  }
}
