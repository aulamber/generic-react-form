import { generateGuid, memoize } from './';

export default function setConfig({ fieldConfig, formChecks, formName }) {
  const memoizedFormChecks = formChecks.map(check => ({
    ...check,
    func: memoize(check.func),
  }));

  return {
    fieldConfig: fieldConfig || {},
    formChecks: memoizedFormChecks || [],
    formName: formName || `Form#${generateGuid()}`,
  };
}
