import { ESLintUtils } from '@typescript-eslint/experimental-utils'

// note - cannot migrate this to an import statement because it will make TSC copy the package.json to the dist folder
const packageJson = require('../package.json')

const createRule = ESLintUtils.RuleCreator(
  name =>
    `https://github.com/drewwyatt/${packageJson.name}/blob/v${packageJson.version}/docs/rules/${name}.md`,
)

export default createRule
