import rule from './no-tslint-disable'
import { RuleTester } from '../rule-tester'

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
})

ruleTester.run('no-tslint-disable', rule, {
  valid: [
    {
      code: 'let a: readonly any[] = [];',
    },
    {
      code: 'let a = new Array();',
    },
  ],
  invalid: [
    {
      code: '/* tslint:disable */',
      output: '/* tslint:disable */',
      errors: [
        {
          messageId: 'commentDetected',
          data: { type: 'string' },
          line: 1,
          column: 1,
        },
      ],
    },
  ],
})
