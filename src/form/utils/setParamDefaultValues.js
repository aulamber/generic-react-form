import { generateGuid } from './';

export default function setParamDefaultValues(params) {
  const { comparFieldsChecks, fieldConfig, formName, formChecks } = params;

  return {
    comparFieldsChecks: comparFieldsChecks || [],
    fieldConfig: fieldConfig || {},
    formChecks: formChecks || [],
    formName: formName || `Form#${generateGuid()}`,
  };
}
