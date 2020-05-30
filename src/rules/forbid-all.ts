import createRule from '../create-rule'

// tslint regex
// https://github.com/palantir/tslint/blob/95d9d958833fd9dc0002d18cbe34db20d0fbf437/src/enableDisableRules.ts#L32
const ENABLE_DISABLE_REGEX = /^\s*tslint:(enable|disable)(?:-(line|next-line))?(:|\s|$)/

const toText = (text: string, type: 'Line' | 'Block') =>
  type === 'Line' ? ['//', text.trim()].join(' ') : ['/*', text.trim(), '*/'].join(' ')

export default createRule({
  name: 'forbid-all',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Identify tslint rule flags so that they can be removed',
      category: 'Stylistic Issues',
      recommended: 'warn',
    },
    messages: {
      commentDetected: 'tslint comment detected: "{{ text }}"',
    },
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
  create: context => {
    const sourceCode = context.getSourceCode()
    return {
      Program: () => {
        const comments = sourceCode.getAllComments()
        comments.forEach(c => {
          if (ENABLE_DISABLE_REGEX.test(c.value)) {
            context.report({
              data: { text: toText(c.value, c.type) },
              node: c,
              messageId: 'commentDetected',
              fix: fixer => fixer.remove(c),
            })
          }
        })
      },
    }
  },
})
