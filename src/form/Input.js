import _ from 'lodash'
import React, { Component, PropTypes } from 'react';

import {
  updateDisableStatus,
  updateFieldValue,
  updateFieldErrors,
  updateFormErrors,
} from '../stateHandling/index'


class Input extends Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { pristine, displayErrorsFromStart } = this.props
    const { name, fields, fieldChecks, formChecks, formErrors } = this.props
    const { setFormPristine, setFields, setDisableStatus, setFormErrors } = this.props
    const value = e.target.value

    let updatedFields = updateFieldValue(name, value, fields)
    updatedFields = updateFieldErrors(name, value, updatedFields, fieldChecks)
    const updatedFormErrors = updateFormErrors(formErrors, formChecks, updatedFields)
    const disabled = updateDisableStatus(displayErrorsFromStart, updatedFields, updatedFormErrors)

    if (pristine) { setFormPristine() }
    setFields(updatedFields)
    setFormErrors(updatedFormErrors)
    setDisableStatus(disabled)
  }

  render() {
    const { name, getFieldValue } = this.props

    return (
      <div>
        <input
          value={getFieldValue(name)}
          onChange={this.onChange}
          placeholder='type something...'
        />
      </div>
    )
  }
}

Input.propTypes = {
  pristine: PropTypes.bool,
  displayErrorsFromStart: PropTypes.bool,
  name: PropTypes.string.isRequired,
  fields: PropTypes.shape(),
  fieldChecks: PropTypes.arrayOf(PropTypes.shape().isRequired),
  formErrors: PropTypes.arrayOf(PropTypes.string.isRequired),
  formChecks: PropTypes.arrayOf(PropTypes.func.isRequired),
  setFormPristine: PropTypes.func,
  setFields: PropTypes.func,
  setFormErrors: PropTypes.func,
  setDisableStatus: PropTypes.func,
  getFieldValue: PropTypes.func,
}

export default Input
