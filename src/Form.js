import React, { Component, PropTypes } from 'react';

import { updateFieldErrors, updateFormErrors } from './errorHandling'

function initializeFields(fields, checks) {
  let stateFields = {}

  Object.keys(fields).forEach(name => {
    const fieldErrors = updateFieldErrors(name, fields[name].value, fields, checks[name])

    stateFields = {
      ...stateFields,
      [name]: {
        pristine: true,
        value: fields[name].value || '',
        errors: fieldErrors[name].errors,
      },
    }
  })

  return stateFields
}

class Form extends Component {
  constructor(props) {
    super(props)

    const {fields, fieldChecks} = this.props

    this.state = {
      pristine: true,
      fields: initializeFields(fields, fieldChecks),
      formErrors: [],
      // disabled:
    }

    this.setFormPristine = this.setFormPristine.bind(this)
    this.setFields = this.setFields.bind(this)
    this.setFormErrors = this.setFormErrors.bind(this)
    this.getFieldValue = this.getFieldValue.bind(this)
  }

  componentDidMount() {
    this.props.giveFieldsToParent(this.state.fields)
  }

  setFormPristine() {
    this.setState({ pristine: false })
  }

  setFields(fields) {
    this.setState({ fields }, () => {
      // console.log('this.state.formErrors = ', this.state.formErrors);

      // const disabled = Object.keys(fields).some((field) => field.errors.length)
      //   || this.state.formErrors.length
      // this.props.giveDisabledStatusToParent(this.state.fields)
      this.props.giveFieldsToParent(fields)

    })
  }

  setFormErrors(fields) {
    const formErrors = updateFormErrors(this.props.formChecks, fields)

    this.setState({ formErrors })
  }

  getFieldValue(field) {
    return this.state.fields[field].value
  }

  render() {
    const { pristine, fields, formErrors } = this.state

    return (
      <form>
        { React.Children.map(
          this.props.children,
          child => React.cloneElement(child, {
            pristine,
            fields,
            formErrors,
            getFieldValue: this.getFieldValue,
            setFields: this.setFields,
            setFormError: this.setFormError,
          })
        )}
      </form>
    )
  }
}

Form.propTypes = {
  fields: PropTypes.shape().isRequired,
  fieldChecks: PropTypes.shape().isRequired,
  formChecks: PropTypes.arrayOf(PropTypes.func),
  giveFieldsToParent: PropTypes.func.isRequired,
  giveFormErrorToParent: PropTypes.func.isRequired,
  giveDisabledStatusToParent: PropTypes.func.isRequired,
}

export default Form
