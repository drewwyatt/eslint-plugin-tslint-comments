# Find and remove tslint comments (forbid-all)

Useful when migrating from tslint to eslint. Once tslint has been removed, this rule helps locate tslint annotations (e.g. `// tslint:disable`).

## Rule Details

Examples of **incorrect** code for this rule:

All tslint [rule flags](https://palantir.github.io/tslint/usage/rule-flags/)

```js
/* tslint:disable */
/* tslint:enable */
/* tslint:disable:rule1 rule2 rule3... */
/* tslint:enable:rule1 rule2 rule3... */
// tslint:disable-next-line
someCode() // tslint:disable-line
// tslint:disable-next-line:rule1 rule2 rule3...
```

Examples of **correct** code for this rule:

```js
// This is a comment that just happens to mention tslint
```

## When Not To Use It

If you are still using tslint.
