import { changeLastCharToDot } from '../utils';

export function hasEmptyFields(fields) {
  let error = {
    type: 'hasEmptyFields',
    bool: false,
    message: 'Some fields are missing: ',
  };

  Object.keys(fields).forEach((field) => {
    if (!fields[field].value && fields[field].isRequired) {
      error = { ...error, bool: true, message: `${error.message} ${field},` };
    }
  });

  if (error.bool) {
    error.message = changeLastCharToDot(error.message);
  }

  return error;
}

export function isSumWithinRange(min, max) {
  return (fields) => {
    const error = {
      type: 'isSumWithinRange',
      bool: false,
      message: `The sum must be between ${min} and ${max}`,
    };
    let sum = 0;

    Object.keys(fields).forEach((field) => {
      sum += Number(fields[field].value);
    });

    if (isNaN(sum) || sum < min || sum > max) { error.bool = true; }

    return error;
  };
}
