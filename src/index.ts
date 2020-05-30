import forbidAll from './rules/forbid-all'

export const configs = {
  recommended: {
    plugins: ['tslint-comments'],
    rules: {
      'tslint-comments/forbid-all': 'error',
    },
  },
}

export const rules = {
  'forbid-all': forbidAll,
}
