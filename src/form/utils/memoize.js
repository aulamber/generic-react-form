import shallow from 'shallowequal';

function memoize(func) {
  let previousArguments;
  let result;

  return function memo(...args) {
    if (shallow(previousArguments, args)) {
      return result;
    }

    result = func(...args);
    previousArguments = args;

    return result;
  };
}

export default memoize;
