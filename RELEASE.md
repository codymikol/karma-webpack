### Tag and Release process

> Starting from a state where everything is in master that we want released.

*The GitHub Portion*

#### Standard release tag

```bash
# npm run script
npm run release
```

_This will ..._

1. bumps the version in _package.json (based on the commit history)
2. updates _CHANGELOG.md_ for the currnet version
3. commits _package.json_ and _CHANGELOG.md_
4. tags a new release

#### Pre-Release tag

```bash
# npm run script
npm run release -- --prerelease <alpha || beta || rc>
```

_this does the above but tags the version `2.0.1-alpha.0`, `2.0.1-beta.0`, `2.0.1-rc.0`_

#### Push new tag to GitHub

```bash
# npm run script
npm run release:tag:v2
```

_this pushes the newly created tag to github_

#### Publish to NPM

```bash
# npm run script
npm login
```

```bash
# npm run script
npm run release:publish
```

_this runs the build ( with clean & linting ) and publishes karma-webpack to npm using the latest github tag (created above)_
