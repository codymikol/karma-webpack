###Tag and Release process

> Starting from a state where everything is in master that we want released.

*The GitHub Portion*
* Increment the version in the package.json and save.
* Generate the changelog for the new release version `npm run generate.changelog`.
* Run `git add .` to stage the changes.
* Commit changelog & package version updates as `chore(release): karma-webpack <package version>`.
* Run `git push` to send the changes to origin.
* Run `git tag <package version>` to create our release tag.
* Run `git push --tags` to send the tag to origin.

*The NPM Portion*
* `npm login` to the user with rights to publish to NPM
* `npm run publish.version` which executes a `dist` build and publishes using the tag created above.
