import rule from './no-tslint-disable'
import { RuleTester } from '../rule-tester'

const PALANTIR_EXAMPLES = [
  ['/* tslint:disable */', '/* tslint:disable */', 1] as const, // Disable all rules for the rest of the file
  ['/* tslint:enable */', '/* tslint:enable */', 1] as const, // Enable all rules for the rest of the file
  [
    '/* tslint:disable:rule1 rule2 rule3... */',
    '/* tslint:disable:rule1 rule2 rule3... */',
    1,
  ] as const, // Disable the listed rules for the rest of the file
  [
    '/* tslint:enable:rule1 rule2 rule3... */',
    '/* tslint:enable:rule1 rule2 rule3... */',
    1,
  ] as const, // Enable the listed rules for the rest of the file
  ['// tslint:disable-next-line', '// tslint:disable-next-line', 1] as const, // Disables all rules for the following line
  ['someCode(); // tslint:disable-line', '// tslint:disable-line', 13] as const, // Disables all rules for the current line
  [
    '// tslint:disable-next-line:rule1 rule2 rule3...',
    '// tslint:disable-next-line:rule1 rule2 rule3...',
    1,
  ] as const, // Disables the listed rules for the next line
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
    ...PALANTIR_EXAMPLES.map(([code, comment, column]) => ({
      code,
      output: code,
      errors: [
        {
          column,
          data: { text: comment },
          line: 1,
          messageId: 'commentDetected' as const,
        },
      ],
    })),
  ],
})
