import {
  capitalize,
  changeLastCharToDot,
  changeLastCommaToAnd,
} from '../utils';

// -----------------------------------------------------------------------------
// -------------------------- Individual field checks --------------------------
// -----------------------------------------------------------------------------

export function isTooLong(length) {
  return (value) => {
    const error = {
      type: 'isTooLong',
      bool: false,
      message: `Too long: should be ${length} characters max.`,
    };

    return value && value.length <= length ? error : { ...error, bool: true };
  };
}

export function isNumber(value) {
  const error = {
    type: 'isNumber',
    bool: false,
    message: 'Should be a number.',
  };

  return (value && !/^[0-9]+$/.test(value) ? { ...error, bool: true } : error);
}


// -----------------------------------------------------------------------------
// --------------------------- Compared fields checks --------------------------
// -----------------------------------------------------------------------------

export function isDifferentFrom(bool) {
  return (fields, fieldsToCompare, comparedField) => {
    let message = (bool ? 'should be different from' : 'should be similar to');
    const error = {
      type: (bool ? 'isDifferentFrom' : 'isSimilarTo'),
      bool: false,
      message: `${capitalize(comparedField)} ${message} `,
      fieldWithError: comparedField,
    };
    let hasError = false;
    message = error.message;

    fieldsToCompare.forEach((field) => {
      if ((bool
        ? fields[comparedField].value === fields[field].value
        : fields[comparedField].value !== fields[field].value
      )) {
        hasError = true;
        error.bool = true;
        message = `${message} ${field},`;
      }
    });

    if (hasError && error.bool) {
      message = changeLastCharToDot(message);
      error.message = (message.includes('and')
        ? changeLastCommaToAnd(message)
        : message
      );
    }

    return error;
  };
}
