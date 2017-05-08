export default function isObjectEmpty(object) {
  if (!object) return true;

  return Object.getOwnPropertyNames(object).length === 0;
}
