<div align="center">
    <img src="./public/react-typescript-logo.png" width="50%" />
    <h1> React-TypeScript Boilerplate App </h1>
</div>

This repository was created with the intention of providing developers with a
starter app to kick-off their Front-End Projects using React-TypeScript.

# Frontend Tooling

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)](https://testing-library.com/docs/react-testing-library/intro/)
[![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)](https://pnpm.io/)
[![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli)

### Linters:

1. [Eslint](https://eslint.org/)
2. [TypeScript-Eslint](https://typescript-eslint.io/)
3. [Eslint Config Airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
4. [Eslint Config Airbnb TypeScript](https://github.com/iamturns/eslint-config-airbnb-typescript)
5. [Eslint Config Prettier](https://github.com/prettier/eslint-config-prettier)

### Plugins:

1. [Eslint Plugin Import](https://github.com/import-js/eslint-plugin-import)
2. [Eslint Plugin jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
3. [Eslint Plugin Prettier](https://github.com/prettier/eslint-plugin-prettier)
4. [Eslint Plugin React](https://github.com/jsx-eslint/eslint-plugin-react)
5. [Eslint Plugin React-Hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

### Testing Tools:

1. [Vitest](https://vitest.dev/) - This is our test runner. It's the tool that
   will find all of the test files in the directory and the run them
2. [Jest DOM](https://github.com/testing-library/jest-dom) - It's a library that
   essentially allows us to do DOM-like things without a web browser, since all
   of the components are tested in isolation
3. [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) -
   It's a library that provides you with a set of utilities to specifically test
   React Components

# How to use it

1. Install pnpm globally in your machine [Documentation](https://pnpm.io/installation).
2. Execute `pnpm install` to perform the instalation of all dependencies.
3. Execute `pnpm run dev`, and immediately you will see the vite server running.

# Committing Changes Into The Project

In order to work under a standard that every contributor in the project must
follow, it has been installed the following resources to work with:

- [Husky](https://typicode.github.io/husky) - It allows you to _write custom
  scripts to be run against the git hooks_ that come available to you in a GIT
  repository.
- [Lint Staged](https://github.com/okonet/lint-staged) - It runs linters _against
  staged git files_.
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) - [Commitizen](https://www.npmjs.com/package/commitizen) - A specification for adding human and machine readable meaning to commit messages.

So, in order to commit your changes, it'll be required to make usage of the
_commitizen command_ `pnpm run commit:changes`. This will execute
`git add -A && cz` , prompting you to start writing your commit message
and creating a new version for the project.

# References

- [Airbnb JavaScript Style Guide](https://airbnb.io/javascript/react/)
- [Principles To Perform Testing](https://testing-library.com/docs/guiding-principles)
- [Using Testing Library jest-dom with Vitest](https://markus.oberlehner.net/blog/using-testing-library-jest-dom-with-vitest/)
- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

# FAQ

- What's the difference between the `public` and the `asset` folder?

  If you have assets that need to be bundled in some way so they need to run
  through some loader that will minify or transform them in some way, it makes
  sense to put them in the `assets` folder. On the other hand, if you have static
  assets that don't need any sort of processing you can just put them directly
  in the `public` folder and these are going to be copied into your build.
