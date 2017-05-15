export function initializeFields(fieldConfig) {
  let initializedFields = {};

  // For each field, we set several properties: errors, isRequired, pristine, value
  Object.keys(fieldConfig).forEach((name) => {
    const { isRequired, value } = fieldConfig[name];

    initializedFields = {
      ...initializedFields,
      [name]: {
        errors: {},
        isRequired: isRequired || true,
        pristine: true,
        value,
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

export function updateFieldValue(fields, name, value) {
  return {
    ...fields,
    [name]: { ...fields[name], pristine: false, value },
  };
}
