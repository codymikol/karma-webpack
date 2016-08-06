#!/usr/bin/env bash
# Accepts a single argument as the tag for the release (such as "next").
# Run this script from the root of the repo.

# `npm whoami` errors and dies if you're not logged in,
# so we redirect the stderr output to /dev/null since we don't care.
NPM_USER=$(npm whoami 2> /dev/null)

if [ "${NPM_USER}" != "mikaak" ]; then
  echo "Publishing limited to 'mikaak'. Did you forget to 'npm login'."
  exit
fi

# Defaults to latest github tag
NPM_TAG="latest"
if [ "$1" ] ; then
  NPM_TAG=${1}
fi

# Sets the above
set -ex

# Publishing the defined tag to npm
npm publish --access public --tag ${NPM_TAG}

# Logs out of npm when publish is complete.
npm logout
