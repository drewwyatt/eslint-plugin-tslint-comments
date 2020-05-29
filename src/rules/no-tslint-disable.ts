// import { AST_TOKEN_TYPES } from '@typescript-eslint/experimental-utils'
import createRule from '../create-rule'

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
      commentDetected: 'ahh',
    },
    schema: [],
  },
  defaultOptions: [],
  create: context => {
    const sourceCode = context.getSourceCode()
    return {
      Program: () => {
        const comments = sourceCode.getAllComments()
        if (comments.length) {
          context.report({
            data: { hey: 'wow' },
            node: comments[0],
            messageId: 'commentDetected',
          })
        }
      },
    }
  },
})
