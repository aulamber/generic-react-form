import { isObjectEmpty } from './';

export default function isDisabled(fields, formErrors, isPostSubmit) {
  if (isPostSubmit && !isObjectEmpty(formErrors)) return true;

  return !!(Object.keys(fields).filter(field => (
    (fields[field].isRequired && !fields[field].value)
    || !isObjectEmpty(fields[field].errors)
  ))).length;
}
