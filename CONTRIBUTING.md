# Contributing

From opening a bug report to creating a pull request: every contribution is
appreciated and welcome. If you're planning to implement a new feature or change
the api please create an issue first. This way we can ensure that your precious
work is not in vain.

## Issues

Most of the time, if webpack is not working correctly for you it is a simple configuration issue.

If you are having difficulty, please search the [StackOverflow with the webpack tag][stackwebpack] for questions related
to the `karma-webpack`. If you can find an answer to your issue, please post a question in [StackOverflow][stackwebpack] or
the [webpack Gitter][webpackgitter] and include both your webpack, karma & karma-webpack versions.

**If you have discovered a bug or have a feature suggestion, feel free to create an issue on Github.**

### Setup
You can decide wether you want to use yarn or npm to setup karma-webpack. Below you will find the setup instructions of both. 

#### Using Yarn
```bash
git clone https://github.com/webpack/karma-webpack.git
cd karma-webpack
npm install -g yarn
yarn install
yarn link
yarn link webpack
```

To run the entire test suite use:

```bash
yarn test
```

#### Using npm
```bash
git clone https://github.com/webpack/karma-webpack.git
cd karma-webpack
npm i
```

To run the entire test suite use:

```bash
npm test
```


### Submitting Changes

After getting some feedback, push to your fork and submit a pull request. We
may suggest some changes or improvements or alternatives, but for small changes
your pull request should be accepted quickly.

Some things that will increase the chance that your pull request is accepted:

* Write tests
* Follow the existing Webpack coding style defined in the eslint and editor config rules.
* Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)

### Required `global` npm packages
We use [conventional changelog][conventionalchangelog] & the [commitizen][cz] adapter to generate our release notes using Angular's commit message convention.

*This requires commitizen to be installed globally.*

- `npm install commitizen -g`
- Now, simply use `git cz` instead of `git commit` when committing.

*If you're not working in a Commitizen friendly repository, then `git cz` will work just the same as `git commit`.*

### Commit Message Format (Commitizen handles this formatting for you)
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of
the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is
the SHA of the commit being reverted.

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, extra semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests or correcting existing tests
* **build**: Changes that affect the build system, CI configuration or external dependencies
* **chore**: Other changes that don't modify `src` or `test` files

### Scope
The scope could be anything specifying place of the commit change. For example
`datepicker`, `dialog`, etc.

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.

A detailed explanation can be found in this [google document][google-commit].

[stackwebpack]: http://stackoverflow.com/tags/webpack
[webpackgitter]: https://gitter.im/webpack/webpack
[conventionalchangelog]: https://github.com/conventional-changelog/conventional-changelog
[cz]: https://github.com/commitizen/cz-cli
[google-commit]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/preview