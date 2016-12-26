import _ from 'lodash'
import React, { Component, PropTypes } from 'react';

import { updateFieldErrors } from './errorHandling'

//   this.props.setFieldError(this.props.name, !!error)
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
    const { name, fieldChecks, setFields/*, setFormError*/ } = this.props
    const value = e.target.value
    let updatedFields = []

    updatedFields = this.updateFieldValue(name, value)
    updatedFields = updateFieldErrors(name, value, updatedFields, fieldChecks)
    setFields(updatedFields)

    // setFormError({ ...fields, [name]: { ...fields[name], value } })
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
// {this.props.children}
// ref={input => this[name] = input}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.shape(),
  fieldChecks: PropTypes.arrayOf(PropTypes.shape().isRequired),
  formChecks: PropTypes.arrayOf(PropTypes.func.isRequired),
  setFields: PropTypes.func,
  setFormError: PropTypes.func,
  getFieldValue: PropTypes.func,
}

export default Input
