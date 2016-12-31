/*
A FAIRE

1) gestion des multiples fieldsToCompare ('' -> []) + fieldsWithError ('' -> [])
2) PASSER EN REDUX
3) faire un composant de checkbox + radio + number + range (+ email ?)
(moins important): email, url, date, color, time

*/

import React, { Component, PropTypes } from 'react';

import {
  updateDisableStatus,
  initializeFields,
  updateFieldsPostSubmit,
  updateFormErrors,
  hasFieldErrors,
  getFinalValues,
} from '../stateHandling/index'


class Form extends Component {
  constructor(props) {
    super(props)

    const { displayErrorsFromStart, fieldChecks, formChecks } = this.props
    const fields = initializeFields(this.props.fields, fieldChecks)
    const formErrors = updateFormErrors({}, formChecks, fields)
    const disabled = updateDisableStatus(true, displayErrorsFromStart, fields, formErrors)

    this.state = { pristine: true, fields, formErrors, disabled }

    this.setFormPristine = this.setFormPristine.bind(this)
    this.setFields = this.setFields.bind(this)
    this.setFormErrors = this.setFormErrors.bind(this)
    this.setDisableStatus = this.setDisableStatus.bind(this)
    this.getFieldValue = this.getFieldValue.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.giveFieldsToParent(this.state.fields)
    this.props.giveFormErrorsToParent(this.state.formErrors)
    this.props.giveDisabledStatusToParent(this.state.disabled)
  }

  setFormPristine() {
    this.setState({ pristine: false })
  }

  setFields(fields) {
    this.setState({ fields }, () => this.props.giveFieldsToParent(fields))
  }

  setFormErrors(formErrors) {
    this.setState({ formErrors }, () => this.props.giveFormErrorsToParent(formErrors))
  }

  setDisableStatus(disabled) {
    this.setState({ disabled }, () => this.props.giveDisabledStatusToParent(disabled))
  }

  getFieldValue(field) {
    return this.state.fields[field].value
  }

  handleSubmit(e) {
    const { displayErrorsFromStart, onSubmit } = this.props
    const { fields, formErrors } = this.state
    const finalValues = getFinalValues(fields)

    if (displayErrorsFromStart) {
      onSubmit(finalValues)
    } else {
      let fieldErrors = hasFieldErrors(fields)
      const updatedFields = updateFieldsPostSubmit(fields)

      if (!fieldErrors && !Object.keys(formErrors).length) {
        onSubmit(finalValues)
      } else {
        this.setFields(updatedFields)
        this.setFormPristine()
        this.setDisableStatus(updateDisableStatus(
          false,
          displayErrorsFromStart,
          updatedFields,
          formErrors
        ))
      }
    }
    e.preventDefault()
  }

  render() {
    const styles = {
      width: '360px',
      padding: '20px 0',
      backgroundColor: '#f2f2f2',
      borderRadius: '10px',
    }
    const { pristine, disabled, fields, formErrors } = this.state
    const { displayErrorsFromStart, fieldChecks, formChecks } = this.props

    return (
      <div style={styles}>
        {
          React.Children.map(
            this.props.children,
            child => React.cloneElement(child, {
              pristine,
              disabled,
              displayErrorsFromStart,
              fields,
              fieldChecks,
              formChecks,
              formErrors,
              setFormPristine: this.setFormPristine,
              setFields: this.setFields,
              setFormErrors: this.setFormErrors,
              setDisableStatus: this.setDisableStatus,
              getFieldValue: this.getFieldValue,
              handleSubmit: this.handleSubmit,
            })
          )
        }
      </div>
    )
  }
}

Form.defaultProps = {
  displayErrorsFromStart: false,
};

Form.propTypes = {
  fields: PropTypes.shape().isRequired,
  fieldChecks: PropTypes.shape().isRequired,
  formChecks: PropTypes.arrayOf(PropTypes.func),
  displayErrorsFromStart: PropTypes.bool,
  giveFieldsToParent: PropTypes.func.isRequired,
  giveFormErrorsToParent: PropTypes.func.isRequired,
  giveDisabledStatusToParent: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default Form
