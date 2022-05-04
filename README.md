## What is this?

A combiner library that adds TS, ESlint and Prettier to your project. All configs are opinionated, and can be extended and modified.

## How to use this library

Add library as a development dependency:

```shell
yarn add --dev @baseline/baseline
```

```shell
npm i -d @baseline/baseline
```

(optional, but recommended):
Add a script in package.json to run baseline:

```json
"scripts": {
  ...
  "baseline": "baseline"
  "baseline:ci": "baseline -r"
}
```

The `baseline:ci` job is there if you wish to run this in a CI environment without modifying files.

Use it in your project by running:

```shell
yarn baseline
```

```shell
npm run baseline
```

## Extending configs

#### Typescript

Add your own `tsconfig.json` file in the root directory of your project.
Then, add the following to your `tsconfig.json`:

```json
  "extends": "./node_modules/@baseline/baseline/tsconfig.json",
  "compilerOptions": {
  ...Whatever I want to add/change...
  }
}
```

#### ESLint

First, you will need to install the separate library to extend the project's ESLint config:

```shell
yarn add --dev @baseline/eslint-config-baseline
```

```shell
npm i -d @baseline/eslint-config-baseline
```

Then, add your own `.eslintrc.js` file in the root directory of your project and add the following to your `.eslintrc.js`:

```json
  "extends": ['@baseline/eslint-config-baseline'],
  "rules": {
  ...Whatever I want to add/change...
  }
}
```

#### Prettier

You can't yet **extend** the prettier config. But you can override it.

Add your own `.prettierrc.js` file in the root directory of your project and just type your own rules there!
