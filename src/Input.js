import _ from 'lodash'
import React, { Component, PropTypes } from 'react';

import { updateDisableStatus, updateFieldErrors } from './stateHandling/stateHandling'


class Input extends Component {
  constructor(props) {
    super(props)

    this.updateFieldValue = this.updateFieldValue.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  updateFieldValue(name, value) {
    return {
      ...this.props.fields,
      [name]: { ...this.props.fields[name], pristine: false, value },
    }
  }

  handleOnChange(e) {
    const { name, fieldChecks, formErrors, setFields, setDisableStatus/*, setFormErrors*/ } = this.props
    const value = e.target.value
    let updatedFields = []
    let disabled

    updatedFields = this.updateFieldValue(name, value)
    updatedFields = updateFieldErrors(name, value, updatedFields, fieldChecks)
    setFields(updatedFields)

    disabled = updateDisableStatus(updatedFields, formErrors)
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

        { this.props.children }

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
