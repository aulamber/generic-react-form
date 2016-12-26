export function isTooLong(length) {
  return (value) => {
    const error = { bool: false, value: `Too long: should be ${length} max.` }

    return value.length <= length ? error : { ...error, bool: true }
  }
}

export function isDifferentFrom(fieldToCompare) {
  return (field, otherField) => {
    const error = { bool: false, value: `Should be different from ${fieldToCompare}.` }

    return (field !== otherField ? error : { ...error, bool: true })
  }
}
