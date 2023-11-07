import {expect, test} from '@jest/globals'
import isCommitInFilteredPRs from '../src/is-commit-in-filtered-prs'
import createDummyPR from './create-dummy-pr'

test('find a draft PRs', () => {
  const testPRs = [createDummyPR(1, {draft: true})]

  const foundPR = isCommitInFilteredPRs(testPRs, {includeDraft: true}) ?? {
    id: null
  }
  expect(foundPR).toBe(true)
})

test('filter out draft PRs', () => {
  const testPRs = [createDummyPR(1, {draft: true})]

  const foundPR = isCommitInFilteredPRs(testPRs, {includeDraft: false})
  expect(foundPR).toBe(false)
})
