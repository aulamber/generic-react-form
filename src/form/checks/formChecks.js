import { changeLastCharToDot } from '../utils';

export function hasEmptyFields(fields) {
  let message = '';

  fields.forEach((field) => {
    if (!field) {
      message = `${message} ${field},`;
    }
  });

  return (message ? changeLastCharToDot(message) : message);
}

export function isSumOutOfRange(min, max) {
  return (fields) => {
    let sum = 0;

    fields.forEach((field) => {
      sum += Number(field);
    });

    return isNaN(sum) || sum < min || sum > max;
  };
}
