[![Version](https://img.shields.io/github/v/release/insurgent-lab/is-pr-action.svg?display_name=tag&sort=semver)](https://github.com/insurgent-lab/is-pr-action/releases)
[![Build Status](https://github.com/insurgent-lab/is-pr-action/actions/workflows/build.yml/badge.svg)](https://github.com/insurgent-lab/is-pr-action/actions/workflows/build.yml)
[![Test Status](https://github.com/insurgent-lab/is-pr-action/actions/workflows/test.yml/badge.svg)](https://github.com/insurgent-lab/is-pr-action/actions/workflows/test.yml)
[![License](https://img.shields.io/github/license/insurgent-lab/is-pr-action.sv)](https://github.com/insurgent-lab/is-pr-action/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

# Github Action: Is PR?

Github Action for checking if the current commit belongs to a pull request.

## Motivation

Inside a running github action you can't always get the information whether you are currently in a PR or not. If for example the trigger event is `pull_request` you have that information but not when your trigger event is `push`.

This action enables you to know if the commit is part of a PR no matter which event type triggered the workflow.

## Usage

```yml
steps:
  - uses: insurgent-lab/is-pr-action@0.1.0
    id: isPR

  - run: echo "Your PR number is ${{ steps.isPR.outputs.number }} and its JSON is ${{ steps.isPR.outputs.pr }}"
```

### Inputs

See [action.yml](action.yml) for more details.

```yml
steps:
  - uses: insurgent-lab/is-pr-action@0.1.0
    id: isPR
    with:
      # Authetication token to access GitHub APIs. (Can be omitted by default.)
      github-token: ${{ github.token }}
      # Verbose setting SHA when using Pull_Request event trigger to fix #16. (For push even trigger this is not necessary.)
      sha: ${{ github.event.pull_request.head.sha }}
      # Only return if PR is still open. (By default it returns PRs in any state.)
      filterOutClosed: true
      # Only return if PR is not in draft state. (By default it returns PRs in any state.)
      filterOutDraft: true
```

### Outputs

See [action.yml](action.yml) for more details.

```yml
steps:
  - uses: insurgent-lab/is-pr-action@0.1.0
    id: isPR

  - run: echo "This commit is part of a PR!"
    if: steps.isPR.outputs.pr_found == 'true'
```

## Limitations

### Pull_request trigger

If you use the `pull_request` event trigger, it won't find the associated PR for the first commit inside that same PR out of the box.

This [article](https://frontside.com/blog/2020-05-26-github-actions-pull_request/#how-does-pull_request-affect-actionscheckout) describes why this is, in detail.
A short form of the article's explanation is, that Github creates an extra merge commit before the `pull_request` event is triggered for which this action can't find an assosiated PR. The `pull_request` trigger for the second PR commit and all following, will again work as expected.

#### Workaround

To always find and pass the correct commit SHA to this action use this workflow config:

```yml
steps:
  - uses: insurgent-lab/is-pr-action@0.1.0
    id: PR
    with:
      sha: ${{ github.event.pull_request.head.sha }}
```

This will then work no matter the trigger event and no matter if it is the first PR commit or not.

### Can't find closed, unmerged PRs

Currently, if you try to find a PR that hasn't been merged yet AND which has been closed, then this app will completely fail in finding that PR. This workflow can only find open PRs, draft PRs and closed+merged PRs.

See https://github.com/insurgent-lab/is-pr-action/issues/165 for the progress on this issue as this might come in a later version.

## Contributing

Contributions are always welcome!
