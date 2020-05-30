import rule from './forbid-all'
import { RuleTester } from '../rule-tester'

type Testable = {
  code: string
  text?: string
  column: number
  output?: string
}

const PALANTIR_EXAMPLES: Testable[] = [
  { code: '/* tslint:disable */', column: 1 }, // Disable all rules for the rest of the file
  { code: '/* tslint:enable */', column: 1 }, // Enable all rules for the rest of the file
  {
    code: '/* tslint:disable:rule1 rule2 rule3... */',
    column: 1,
  }, // Disable the listed rules for the rest of the file
  {
    code: '/* tslint:enable:rule1 rule2 rule3... */',
    column: 1,
  }, // Enable the listed rules for the rest of the file
  { code: '// tslint:disable-next-line', column: 1 }, // Disables all rules for the following line
  {
    code: 'someCode(); // tslint:disable-line',
    text: '// tslint:disable-line',
    column: 13,
    output: 'someCode(); ',
  }, // Disables all rules for the current line
  {
    code: '// tslint:disable-next-line:rule1 rule2 rule3...',

    column: 1,
  }, // Disables the listed rules for the next line
]

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
})

ruleTester.run('forbid-all', rule, {
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
    ...PALANTIR_EXAMPLES.map(({ code, column, output, text }) => ({
      code,
      output: output ?? '',
      errors: [
        {
          column,
          data: { text: text ?? code },
          line: 1,
          messageId: 'commentDetected' as const,
        },
      ],
    })),
  ],
})
