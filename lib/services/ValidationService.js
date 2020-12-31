function isKarmaConfigValid(config) {
  return allTrue([
    validateKarmaConfigExists(config),
    validateWebpackFrameworkSet(config)
  ])
}

const KARMA_WEBPACK_VALIDATION_ERROR_PREFIX = '[karma-webpack] error: - '

/**
 * This is a shorthand for validating that some condition is true, if not the
 * passed message will be logged as an error and the validator will return false
 * @param conditionExpression - The expression function to be evaluated
 * @param errorMessage        - An error to be logged upon failure
 */
function validate(conditionExpression, errorMessage) {
  if(conditionExpression()) return true;
  throw new Error(KARMA_WEBPACK_VALIDATION_ERROR_PREFIX + errorMessage)
}

function allTrue(validations) {
  return validations.every((v) => v === true)
}

function validateKarmaConfigExists(config) {
  return validate(
    () => !!config,
    'karma configuration was unable to be resolved.'
  )
}

function validateWebpackFrameworkSet(config) {
  return validate(
    () => config.frameworks && config.frameworks.indexOf('webpack') !== -1,
    'karma config frameworks must include "webpack"'
  )
}

module.exports = {
  isKarmaConfigValid: isKarmaConfigValid,
}
