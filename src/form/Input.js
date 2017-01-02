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
    const { name, fieldChecks, formChecks, formErrors } = this.props
    const { setFormPristine, setFields, setDisableStatus, setFormErrors } = this.props
    const value = e.target.value
    let fields = this.props.fields

    fields = updateFieldValue(name, value, fields)
    fields = updateFieldErrors(name, value, fields, fieldChecks[name])
    fields = updateFieldErrors(name, value, fields, fieldChecks.comparChecks, true)
    const updatedFormErrors = updateFormErrors(formErrors, formChecks, fields)
    const disabled = updateDisableStatus(false, displayErrorsFromStart, fields, updatedFormErrors)

    if (pristine) { setFormPristine() }
    setFields(fields)
    setFormErrors(updatedFormErrors)
    setDisableStatus(disabled)
  }

  render() {
    const { displayErrorsFromStart, fields, name, getFieldValue } = this.props
    const displayErrors = (displayErrorsFromStart
      ? !!(Object.keys(fields[name].errors).length)
      : !fields[name].pristine && !!(Object.keys(fields[name].errors).length)
    )
    let styles = {
      border: '1px solid #bfbfbf',
      height: '30px',
      width: '160px',
      paddingLeft: '15px',
      paddingRight: '15px',
      color: '#666666',
      fontSize: '16px',
      borderRadius: '3px',
    }

    if (displayErrors) { styles = { ...styles, border: '1px solid red' } }

    return (
      <div>
        <input
          style={styles}
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
  fieldChecks: PropTypes.shape(),
  formErrors: PropTypes.shape(),
  formChecks: PropTypes.arrayOf(PropTypes.func.isRequired),
  setFormPristine: PropTypes.func,
  setFields: PropTypes.func,
  setFormErrors: PropTypes.func,
  setDisableStatus: PropTypes.func,
  getFieldValue: PropTypes.func,
}

export default Input
