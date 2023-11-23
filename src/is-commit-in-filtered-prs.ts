import * as core from '@actions/core'
import {PR} from './types/pull-request'

interface Options {
  includeDraft?: boolean
}

const DEFAULTS: Options = {
  includeDraft: true
}

function getPrsIdsString(pullRequests: PR[]): string {
  return pullRequests.length
    ? pullRequests.map(pr => `#${pr.number}`).join(', ')
    : 'none'
}

export default function isCommitInFilteredPRs(
  pullRequests: PR[],
  options: Options
): boolean {
  options = {...DEFAULTS, ...options}

  core.info(`Commit in PRs (pre-filtering): ${getPrsIdsString(pullRequests)}`)

  const filteredPRs = pullRequests
    .filter(({state}) => state === 'open')
    .filter(({draft}) => !draft || !!options.includeDraft)

  core.info(`Commit in PRs (post-filtering): ${getPrsIdsString(filteredPRs)}`)

  return !!filteredPRs.length
}
