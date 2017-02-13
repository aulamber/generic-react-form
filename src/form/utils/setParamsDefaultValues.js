import { generateGuid } from './index'

export default function setParamsDefaultValues(params) {
  const { name/*, displayErrorsFromStart*/, initialFields, fieldChecks, formChecks } = params

  if (!name) { params = { ...params, name: `Form#${generateGuid()}` }}
  // if (!displayErrorsFromStart) { params = { ...params, displayErrorsFromStart: false } }
  if (!initialFields) { params = { ...params, initialFields: {} } }
  if (!fieldChecks) { params = { ...params, fieldChecks: {} } }
  if (!formChecks) { params = { ...params, formChecks: [] } }

  return params
}
