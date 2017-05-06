export default function isDisabled(fields) {
  return !!(Object.keys(fields).filter(field => (
    (fields[field].isRequired && !fields[field].value)
    || fields[field].errors
  ))).length;
}
