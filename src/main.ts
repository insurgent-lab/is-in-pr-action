import * as core from '@actions/core'
import * as github from '@actions/github'
import getCommitPRs from './adapter/get-commit-prs'
import getInputs from './io/get-inputs'
import isCommitInFilteredPRs from './is-commit-in-filtered-prs'

async function main(): Promise<void> {
  try {
    const {token, sha, includeDraft} = getInputs()

    core.info(`Running sha: ${sha}, includeDraft: ${includeDraft}.`)

    const octokit = github.getOctokit(token)
    const allPRs = await getCommitPRs(octokit, sha)

    const result = isCommitInFilteredPRs(allPRs, {
      includeDraft
    })

    core.info(
      `Commit "${sha}" is${
        !result ? ' not' : ''
      } part of a PR matching the requirements.`
    )
    core.setOutput('result', result)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

main()
