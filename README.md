# eslint-plugin-tslint-comments

[![npm badge](https://img.shields.io/npm/v/eslint-plugin-tslint-comments?style=flat-square)](https://www.npmjs.com/package/eslint-plugin-tslint-comments)

## Archived because this rule is now part of [`@typescript-eslint/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)

### Use [`ban-tslint-comment`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-tslint-comment.md) instead

Useful when migrating from tslint to eslint. Once tslint has been removed, this rule helps locate tslint annotations (e.g. `// tslint:disable`).

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-tslint-comments`:

```
$ npm install eslint-plugin-tslint-comments --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-tslint-comments` globally.

## Usage

Add `tslint-comments` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["tslint-comments"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "tslint-comments/forbid-all": 2
  }
}
```

## Supported Rules

- [forbid-all](docs/rules/forbid-all.md): Identify tslint rule flags so that they can be removed
