/*
A FAIRE

1) faire un wrapper de fonction qui en cas de succès appelle la fonction
  onSubmit de l'utilisateur, et en cas d'erreur de field s'occupe du 3)
2) gestion du form.pristine && du field.pristine qui passe à false après
  le submit pour permettre l'affichage des erreurs
3) proposer à l'utilisateur du form une option pour soit afficher les erreurs
  du formulaire dès le render initial du form, ou bien après !pristine
  (aux onChange() + au submit)
4) gestion des multiples fieldsToCompare ('' -> []) + fieldsWithError ('' -> [])
5) faire un composant de checkbox + radio + number + range (+ email ?)
(moins important): email, url, date, color, time
6) Transformer les messages d'erreur de string à constantes (pour pouvoir
  personnaliser les messages d'erreur. Ex: 'Some fields are missing: firstName,
  lastName'.

*/

import React, { Component, PropTypes } from 'react';

import {
  updateDisableStatus,
  initializeFields,
  updateFormErrors,
} from '../stateHandling/index'


class Form extends Component {
  constructor(props) {
    super(props)

    const {fields, fieldChecks, formChecks} = this.props

    this.state = {
      pristine: true,
      fields: initializeFields(fields, fieldChecks),
      formErrors: updateFormErrors([], formChecks, fields),
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

  render() {
    const { pristine, disabled, fields, formErrors } = this.state

    return (
      <form>
        {
          React.Children.map(
            this.props.children,
            child => React.cloneElement(child, {
              pristine,
              disabled,
              fields,
              displayErrorsFromStart: this.props.displayErrorsFromStart,
              formChecks: this.props.formChecks,
              formErrors,
              setFormPristine: this.setFormPristine,
              setFields: this.setFields,
              setFormErrors: this.setFormErrors,
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
  displayErrorsFromStart: PropTypes.bool,
  giveFieldsToParent: PropTypes.func.isRequired,
  giveFormErrorsToParent: PropTypes.func.isRequired,
  giveDisabledStatusToParent: PropTypes.func.isRequired,
}

export default Form
