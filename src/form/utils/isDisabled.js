import _ from 'lodash';

import { isObjectEmpty } from './';

export default function isDisabled(fields, formErrors, isPostSubmit) {
  if (isPostSubmit && !isObjectEmpty(formErrors)) return true;

  return !!(
    !isObjectEmpty(_.omit(formErrors, ['form']))
    || Object.keys(fields).filter(field => (
      (fields[field].isRequired && !fields[field].value)
      || !isObjectEmpty(fields[field].errors)
    )).length
  );
}
