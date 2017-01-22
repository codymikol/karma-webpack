###Tag and Release process

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
5. pushes the new tag to github
6. publishes the new version to npm

#### Pre-Release tags

```bash
# npm run script
npm run release -- --prerelease <alpha || beta || rc>
```

_this does the above but tags the version `2.0.1-alpha.0`, `2.0.1-beta.0`, `2.0.1-rc.0`_
