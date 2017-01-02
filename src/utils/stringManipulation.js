export function capitalize(str) {
  return str && str[0].toUpperCase() + str.slice(1);
}

export function changeLastCharToDot(str) {
  return `${str.substring(0, str.length - 1)}.`
}

export function changeLastCommaToAnd(str) {
  const i = str.lastIndexOf(",");

  return `${str.substring(0, i)} and${str.substring(i + 1, str.length)}`
}
