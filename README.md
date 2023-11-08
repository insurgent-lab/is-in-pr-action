[![Version](https://img.shields.io/github/v/release/insurgent-lab/is-in-pr-action.svg?display_name=tag&sort=semver)](https://github.com/insurgent-lab/is-in-pr-action/releases)
[![Build Status](https://github.com/insurgent-lab/is-in-pr-action/actions/workflows/build.yml/badge.svg)](https://github.com/insurgent-lab/is-in-pr-action/actions/workflows/build.yml)
[![Test Status](https://github.com/insurgent-lab/is-in-pr-action/actions/workflows/test.yml/badge.svg)](https://github.com/insurgent-lab/is-in-pr-action/actions/workflows/test.yml)
[![License](https://img.shields.io/github/license/insurgent-lab/is-in-pr-action.svg)](https://github.com/insurgent-lab/is-in-pr-action/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

# Github Action: Is in PR?

Github Action for checking if the current commit belongs to an open pull request.

## Motivation

Inside a running GitHub Action, you can't always know if you are currently in a PR. When the trigger event is not `pull_request` (e.g `push`), you don't have that information.

If for example you need to configure a workflow to run on both `push` and `pull_request` events, there is currently no way to prevent it from running twice when commits are pushed to a PR branch (e.g. Renovate Bot "branch automerge" failing and opening a PR).

This action enables you to know if the commit is part of an open PR no matter which event type triggered the workflow.

## Usage

```yml
steps:
  - uses: insurgent-lab/is-in-pr-action@v0.1.3
    id: isPR

  - run: echo "This commit is part of a PR!"
    if: steps.isPR.outputs.result == true
```

### Inputs

```yml
steps:
  - uses: insurgent-lab/is-in-pr-action@v0.1.3
    id: isPR
    with:
      # Include draft PRs. (default: true)
      includeDraft: false
```

See [action.yml](action.yml) for more details.

### Need PR infos?

Check out [`8BitJonny/gh-get-current-pr`](https://github.com/8BitJonny/gh-get-current-pr), from which this action is initially forked.

## Contributing

Contributions are always welcome!
