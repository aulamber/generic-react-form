// ================================ FIELD CHECKS ===============================

export function isTooLong(length) {
  return (value) => {
    const error = { bool: false, value: `Too long: should be ${length} max.` }

    return value.length <= length ? error : { ...error, bool: true }
  }
}

export function isNumber(value) {
  const error = { bool: false, value: 'Should be a number.' }

  return (value && !/^[0-9]+$/.test(value) ? { ...error, bool: true } : error)
}

export function isDifferentFrom(fieldToCompare) {
  return (field, otherField) => {
    const error = { bool: false, value: `Should be different from ${fieldToCompare}.` }

    return (field && field === otherField ? { ...error, bool: true } : error)
  }
}

export function isSimilarTo(fieldToCompare) {
  return (field, otherField) => {
    const error = { bool: false, value: `Should be similar to ${fieldToCompare}.` }

    return (field && field !== otherField ? { ...error, bool: true } : error)
  }
}

// ================================ FORM CHECKS ================================

export function hasEmptyFields(fields) {
  const error = { bool: false, value: `Some fields are missing.` }

  Object.keys(fields).forEach(field => {
    if (!fields[field].value && fields[field].isRequired) {
      error.bool = true
      // error.value += ` ${field},`
      return
    }
  })

  // if (error.bool) { error.value = error.value.substring(0, error.value.length - 1); }

  return error
}

export function isSumWithinRange(min, max) {
  return (fields) => {
    const error = { bool: false, value: `The sum must be between ${min} and ${max}` }
    let sum = 0

    Object.keys(fields).forEach(field => {
      sum += Number(fields[field].value)
    })

    if (isNaN(sum) || sum < min || sum > max) { error.bool = true }

    return error
  }
}
