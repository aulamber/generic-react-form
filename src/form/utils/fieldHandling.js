export function initializeFields(fieldConfig) {
  let initializedFields = {};

  // For each field, we set several properties: checks, errors, isRequired, pristine, value
  Object.keys(fieldConfig).forEach((name) => {
    initializedFields = {
      ...initializedFields,
      [name]: {
        errors: null,
        isRequired: true,
        pristine: true,
        value: null,
        ...fieldConfig[name],
      },
    };
  });

  return initializedFields;
}

export function getFinalValues(fields) {
  let values = {};

  Object.keys(fields).forEach((field) => {
    values = { ...values, [field]: fields[field].value };
  });

  return values;
}

export function setFieldValue(name, value, fields) {
  return {
    ...fields,
    [name]: { ...fields[name], pristine: false, value },
  };
}
