import rule from './no-tslint-disable'
import { RuleTester } from '../rule-tester'

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
})

ruleTester.run('no-tslint-disable', rule, {
  valid: [
    {
      code: 'let a: readonly any[] = [];',
      options: [{ default: 'array' }],
    },
    {
      code: 'let a = new Array();',
      options: [{ default: 'array' }],
    },
  ],
  invalid: [
    {
      code: 'let a: Array<string> = [];',
      output: 'let a: string[] = [];',
      options: [{ default: 'array' }],
      errors: [
        {
          messageId: 'commentDetected',
          data: { type: 'string' },
          line: 1,
          column: 8,
        },
      ],
    },
  ],
})
