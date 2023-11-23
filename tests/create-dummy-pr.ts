import {PR} from '../src/types/pull-request'

interface Options {
  sha?: string
  closed?: boolean
  draft?: boolean
}

export default function createDummyPR(id: number, options: Options): PR {
  return {
    number: id,
    state: options.closed ? 'closed' : 'open',
    draft: options.draft ?? false,
    head: {
      sha: options.sha ?? ''
    } as PR['head']
  } as PR
}
