[![Version](https://img.shields.io/github/v/release/insurgent-lab/is-in-pr-action.svg?display_name=tag&sort=semver)](https://github.com/insurgent-lab/is-in-pr-action/releases)
[![Build Status](https://github.com/insurgent-lab/is-in-pr-action/actions/workflows/build.yml/badge.svg)](https://github.com/insurgent-lab/is-in-pr-action/actions/workflows/build.yml)
[![Test Status](https://github.com/insurgent-lab/is-in-pr-action/actions/workflows/test.yml/badge.svg)](https://github.com/insurgent-lab/is-in-pr-action/actions/workflows/test.yml)
[![License](https://img.shields.io/github/license/insurgent-lab/is-in-pr-action.svg)](https://github.com/insurgent-lab/is-in-pr-action/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

# Github Action: Is in PR?

Github Action for checking if the current commit belongs to an open pull request.

## Motivation

Inside a running GitHub Action, you can't always know if you are currently in a PR. When the trigger event is not `pull_request` (e.g `push`), you don't have that information.

If for example you need to configure a workflow to run on both `push` and `pull_request` events, there is currently no way to prevent it from running twice when commits are pushed to a PR branch. See the ["Prevent duplicate checks on PRs" example](#prevent-duplicate-checks-on-prs).

This action enables you to know if the commit is part of an open PR no matter which event type triggered the workflow.

## Usage

### As a job step

```yml
steps:
  - uses: insurgent-lab/is-in-pr-action@v0.1.4
    id: isInPR

  - run: echo "This commit is part of a PR!"
    if: ${{ steps.isInPR.outputs.result == 'true' }}

  - run: echo "This commit is not part of a PR!"
    if: ${{ steps.isInPR.outputs.result == 'false' }}
```

### As a separate job

```yml
jobs:
  is-in-pr:
    runs-on: ubuntu-latest

    steps:
      - uses: insurgent-lab/is-in-pr-action@v0.1.4
        id: isInPR
    outputs:
      result: ${{ steps.isInPR.outputs.result }}

  log-result:
    runs-on: ubuntu-latest
    needs: is-in-pr

    steps:
      - run: echo "This commit is part of a PR!"
        if: ${{ needs.is-in-pr.outputs.result == 'true' }}

      - run: echo "This commit is not part of a PR!"
        if: ${{ needs.is-in-pr.outputs.result == 'false' }}
```

## Inputs

```yml
steps:
  - uses: insurgent-lab/is-in-pr-action@v0.1.4
    id: isPR
    with:
      # Include draft PRs. (default: true)
      includeDraft: false
```

See [action.yml](action.yml) for more details.

## Examples

### Prevent duplicate checks on PRs

In this example, we run the action in a separate job and use its output to avoid running our "Test" workflow twice on PRs (because both the `push` & `pull_request` triggers). _Note: this is a good solution to deduplicate PRs checks on [Renovate Bot failed "branch automerge"](https://docs.renovatebot.com/key-concepts/automerge/#branch-vs-pr-automerging)._

```yml
name: Test

on:
  push:
  pull_request:

jobs:
  prevent-duplicate-checks:
    runs-on: ubuntu-latest
    steps:
      - uses: insurgent-lab/is-in-pr-action@v0.1.4
        id: isInPR
    outputs:
      should-run: ${{ !(steps.isInPR.outputs.result == 'true' && github.event_name == 'push') }}

  test:
    runs-on: ubuntu-latest

    needs: prevent-duplicate-checks
    if: ${{ needs.prevent-duplicate-checks.outputs.should-run == 'true' }}

    # ...
```

## Need PR infos?

Check out [`8BitJonny/gh-get-current-pr`](https://github.com/8BitJonny/gh-get-current-pr), from which this action was forked.

## Contributing

Contributions are always welcome!
