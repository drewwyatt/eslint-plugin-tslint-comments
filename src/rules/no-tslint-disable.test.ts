import rule from './no-tslint-disable'
import { RuleTester } from '../rule-tester'

const PALANTIR_EXAMPLES = [
  '/* tslint:disable */', // Disable all rules for the rest of the file
  '/* tslint:enable */', // Enable all rules for the rest of the file
  '/* tslint:disable:rule1 rule2 rule3... */', // Disable the listed rules for the rest of the file
  '/* tslint:enable:rule1 rule2 rule3... */', // Enable the listed rules for the rest of the file
  '// tslint:disable-next-line', // Disables all rules for the following line
  'someCode(); // tslint:disable-line', // Disables all rules for the current line
  '// tslint:disable-next-line:rule1 rule2 rule3...', // Disables the listed rules for the next line
]

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
    {
      code: '// some other comment',
    },
    {
      code: '// TODO: this is a comment that mentions tslint',
    },
    {
      code: '/* another comment that mentions tslint */',
    },
  ],
  invalid: [
    ...PALANTIR_EXAMPLES.map(ex => ({
      code: ex,
      output: ex,
      errors: [
        {
          messageId: 'commentDetected' as const,
          data: { type: 'string' },
          line: 1,
          column: 1,
        },
      ],
    })),
  ],
})
