import {
  capitalize,
  changeLastCharToDot,
  changeLastCommaToAnd,
} from './stringManipulation'

// =============================================================================
// =============================================================================
// ================================ FIELD CHECKS ===============================
// =============================================================================
// =============================================================================

// -----------------------------------------------------------------------------
// ---------------------- Individual field verifications -----------------------
// -----------------------------------------------------------------------------

export function isTooLong(length) {
  return (value) => {
    const error = {
      type: 'isTooLong',
      bool: false,
      message: `Too long: should be ${length} max.`,
    }

    return value.length <= length ? error : { ...error, bool: true }
  }
}

export function isNumber(value) {
  const error = {
    type: 'isNumber',
    bool: false,
    message: 'Should be a number.',
  }

  return (value && !/^[0-9]+$/.test(value) ? { ...error, bool: true } : error)
}


// -----------------------------------------------------------------------------
// ----------------------- Compared fields verifications -----------------------
// -----------------------------------------------------------------------------

export function isDifferentFrom(bool) {
  return (fields, fieldsToCompare, comparedField) => {
    let message = (bool ? 'should be different from' : 'should be similar to')
    let error = {
      type: (bool? 'isDifferentFrom' : 'isSimilarTo'),
      bool: false,
      message: `${capitalize(comparedField)} ${message} `,
      fieldWithError: comparedField,
    }
    let hasError = false
    message = error.message

    fieldsToCompare.forEach(field => {
      if ((bool
        ? fields[comparedField].value === fields[field].value
        : fields[comparedField].value !== fields[field].value
      )) {
        hasError = true
        error.bool = true
        message = `${message} ${field},`
        return
      }
    })

    if (hasError && error.bool) {
      message = changeLastCharToDot(message)
      error.message = (message.includes('and')
        ? changeLastCommaToAnd(message)
        : message
      )
    }

    return error
  }
}


// =============================================================================
// =============================================================================
// ================================ FORM CHECKS ================================
// =============================================================================
// =============================================================================

export function hasEmptyFields(fields) {
  let error = {
    type: 'hasEmptyFields',
    bool: false,
    message: `Some fields are missing: `,
  }

  Object.keys(fields).forEach(field => {
    if (!fields[field].value && fields[field].isRequired) {
      error = { ...error, bool: true, message: `${error.message} ${field},` }
      return
    }
  })

  if (error.bool) {
    error.message = changeLastCharToDot(error.message);
  }

  return error
}

export function isSumWithinRange(min, max) {
  return (fields) => {
    const error = {
      type: 'isSumWithinRange',
      bool: false,
      message: `The sum must be between ${min} and ${max}`,
    }
    let sum = 0

    Object.keys(fields).forEach(field => {
      sum += Number(fields[field].value)
    })

    if (isNaN(sum) || sum < min || sum > max) { error.bool = true }

    return error
  }
}
