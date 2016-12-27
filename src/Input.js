import _ from 'lodash'
import React, { Component, PropTypes } from 'react';

import {
  updateDisableStatus,
  updateFieldValue,
  updateFieldErrors
} from './stateHandling/index'


class Input extends Component {
  constructor(props) {
    super(props)

    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(e) {
    const { name, fields, fieldChecks, formErrors, setFields, setDisableStatus/*, setFormErrors*/ } = this.props
    const value = e.target.value
    let updatedFields = fields

    updatedFields = updateFieldValue(name, value, updatedFields)
    updatedFields = updateFieldErrors(name, value, updatedFields, fieldChecks)
    const disabled = updateDisableStatus(updatedFields, formErrors)

    setFields(updatedFields)
    setDisableStatus(disabled)

    // setFormErrors({ ...fields, [name]: { ...fields[name], value } })
  }

  render() {
    const { name, getFieldValue } = this.props

    return (
      <div>
        <input
          value={getFieldValue(name)}
          onChange={this.handleOnChange}
          placeholder='type something...'
        />
      </div>
    )
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.shape(),
  fieldChecks: PropTypes.arrayOf(PropTypes.shape().isRequired),
  formErrors: PropTypes.arrayOf(PropTypes.string.isRequired),
  formChecks: PropTypes.arrayOf(PropTypes.func.isRequired),
  setFields: PropTypes.func,
  setFormErrors: PropTypes.func,
  setDisableStatus: PropTypes.func,
  getFieldValue: PropTypes.func,
}

export default Input
