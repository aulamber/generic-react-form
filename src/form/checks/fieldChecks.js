export function isNotGrenoble(value) {
  const error = {
    bool: false,
    message: 'You cannot pick Grenoble, sorry!',
    type: 'isNotGrenoble',
  };

  return value !== 'Grenoble' ? error : { ...error, bool: true };
}

export function isTooLong(length) {
  return (value) => {
    const error = {
      bool: false,
      message: `Should be 1-${length} characters.`,
      type: 'isTooLong',
    };

    return value && value.length <= length ? error : { ...error, bool: true };
  };
}

export function isNumber(value) {
  const error = {
    bool: false,
    message: 'Should be a number.',
    type: 'isNumber',
  };

  return (value && !/^[0-9]+$/.test(value) ? { ...error, bool: true } : error);
}
