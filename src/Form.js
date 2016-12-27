import React, { Component, PropTypes } from 'react';

import {
  updateDisableStatus,
  initializeFields,
  updateFormErrors
} from './stateHandling/index'


class Form extends Component {
  constructor(props) {
    super(props)

    const {fields, fieldChecks} = this.props

    this.state = {
      pristine: true,
      fields: initializeFields(fields, fieldChecks),
      formErrors: [],
      disabled: updateDisableStatus(fields, []),
    }

    this.setFormPristine = this.setFormPristine.bind(this)
    this.setFields = this.setFields.bind(this)
    this.setFormErrors = this.setFormErrors.bind(this)
    this.setDisableStatus = this.setDisableStatus.bind(this)
    this.getFieldValue = this.getFieldValue.bind(this)
  }

  componentDidMount() {
    this.props.giveFieldsToParent(this.state.fields)
    this.props.giveDisabledStatusToParent(this.state.disabled)
  }

  setFormPristine() {
    this.setState({ pristine: false })
  }

  setFields(fields) {
    this.setState({ fields }, () => this.props.giveFieldsToParent(fields))
  }

  setFormErrors(fields) {
    this.setState({ formErrors: updateFormErrors(this.props.formChecks, fields) })
  }

  setDisableStatus(disabled) {
    this.setState({ disabled }, () => this.props.giveDisabledStatusToParent(disabled))
  }

  getFieldValue(field) {
    return this.state.fields[field].value
  }

  render() {
    const { pristine, fields, formErrors } = this.state

    return (
      <form>
        {
          React.Children.map(
            this.props.children,
            child => React.cloneElement(child, {
              pristine,
              fields,
              formErrors,
              setFields: this.setFields,
              setFormErrors: this.setFormError,
              setDisableStatus: this.setDisableStatus,
              getFieldValue: this.getFieldValue,
            })
          )
        }
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
