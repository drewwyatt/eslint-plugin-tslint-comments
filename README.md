# eslint-plugin-tslint-comments

Find and remove tslint:ignore comments

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
    "plugins": [
        "tslint-comments"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "tslint-comments/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





