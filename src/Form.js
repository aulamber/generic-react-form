/*
A FAIRE

1) gestion de FormErrors
2) faire un wrapper de fonction qui en cas de succès appelle la fonction
  onSubmit de l'utilisateur, et en cas d'erreur de field s'occupe du 3)
3) gestion du form.pristine && du field.pristine qui passe à false après
  le submit pour permettre l'affichage des erreurs
4) proposer à l'utilisateur du form une option pour soit afficher les erreurs
  du formulaire dès le render initial du form, ou bien après !pristine
  (aux onChange() + au submit)

*/


import React, { Component, PropTypes } from 'react';

import {
  updateDisableStatus,
  initializeFields,
  updateFormErrors
} from './stateHandling/stateHandling'


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
        { React.Children.map(
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
