import createRule from '../create-rule'

// tslint regex
// https://github.com/palantir/tslint/blob/95d9d958833fd9dc0002d18cbe34db20d0fbf437/src/enableDisableRules.ts#L32
const ENABLE_DISABLE_REGEX = /^\s*tslint:(enable|disable)(?:-(line|next-line))?(:|\s|$)/

const toText = (text: string, type: 'Line' | 'Block') =>
  type === 'Line' ? ['//', text.trim()].join(' ') : ['/*', text.trim(), '*/'].join(' ')

export default createRule({
  name: 'no-tslint-disable',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'tslint comments are no longer needed and should be removed',
      category: 'Stylistic Issues',
      recommended: 'warn',
    },
    messages: {
      commentDetected: 'tslint comment detected: "{{ text }}"',
    },
    schema: [],
  },
  defaultOptions: [],
  create: context => {
    const sourceCode = context.getSourceCode()
    return {
      Program: () => {
        const comments = sourceCode.getAllComments()
        comments.forEach(({ type, value }) => {
          if (ENABLE_DISABLE_REGEX.test(value)) {
            context.report({
              data: { text: toText(value, type) },
              node: comments[0],
              messageId: 'commentDetected',
            })
          }
        })
      },
    }
  },
})
