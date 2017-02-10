/*
A FAIRE

1) Refactorer les méthodes de createForm parce que répétitions et trop long
2) Ajouter linter
3) Enregistrer un état pristine de la data
4) Proposer de mettre la data à zéro
5) Utiliser reselect pour le filtre de fieldErrorsToDisplay
6) faire un composant de select + checkbox + textarea + radio/radiogroup
+ number + range (+ email ?) (moins important): email, url, date, color, time
7) Remettre dans l'ordre alpha tous les noms de variables + proptypes
8) Mettre tous les composants réutilisables (Input etc.) dans un fichier index.js
à la racine qui sera appelé sans /index dans le path
9) optimisation des perfs (limiter au max les boucles dans les boucles avec les forEach)
10) comparer à redux form

11) tests
12) doc + readme
13) passage en module npm
*/

import React, { Component, PropTypes } from 'react';

import {
  getFieldErrorsToDisplay,
  getFinalValues,
  hasFieldErrors,
  initializeFields,
  updateDisableStatus,
  updateFieldErrors,
  updateFieldValue,
  updateFieldsPostSubmit,
  updateFormErrors,
  setParamsDefaultValues,
  shouldDisplayFormErrors,
} from './utils/index';

export default function createForm({ ...params }, ComposedComponent) {
  class Form extends Component {
    constructor(props) {
      super(props);

      this.state = {
        disabled: true,
        fields: {},
        fieldErrorsToDisplay: {},
        formErrors: {},
        displayFormErrors: false,
        pristine: true,
      }

      this.params = setParamsDefaultValues(params);

      this.handleSubmit = this.handleSubmit.bind(this);
      this.onFieldChange = this.onFieldChange.bind(this);
      this.setFormProperty = this.setFormProperty.bind(this);
    }

    getChildContext() {
      return {
        displayErrorsFromStart: this.params.displayErrorsFromStart,
        fields: this.state.fields,
        onFieldChange: this.onFieldChange,
      };
    }

    componentWillMount() {
      const { pristine } = this.state;
      const { displayErrorsFromStart, initialFields, fieldChecks, formChecks } = this.params;

      const fields = initializeFields(initialFields, fieldChecks);
      const fieldErrorsToDisplay = getFieldErrorsToDisplay(
        fields,
        displayErrorsFromStart,
      );
      const formErrors = updateFormErrors({}, formChecks, fields);
      const displayFormErrors = shouldDisplayFormErrors(
        formErrors,
        displayErrorsFromStart,
        pristine,
      );
      const disabled = updateDisableStatus(
        true,
        displayErrorsFromStart,
        fields,
        formErrors,
      );

      this.setFormProperty('fields', fields);
      this.setFormProperty('fieldErrorsToDisplay', fieldErrorsToDisplay);
      this.setFormProperty('displayFormErrors', displayFormErrors);
      this.setFormProperty('formErrors', formErrors);
      this.setFormProperty('disabled', disabled);
    }

    setFormProperty(key, value) {
      this.setState({ [key]: value });
    }

    onFieldChange(userFunction = () => {}) {
      return (name) => {
        return (e) => {
          const { pristine } = this.state;
          const { displayErrorsFromStart, fieldChecks, formChecks } = this.params;
          const value = e.target.value;
          let fields = this.state.fields;
          let formErrors = this.state.formErrors;

          fields = updateFieldValue(name, value, fields);
          fields = updateFieldErrors(name, value, fields, fieldChecks[name]);
          fields = updateFieldErrors(name, value, fields, fieldChecks.comparChecks, true);
          formErrors = updateFormErrors(formErrors, formChecks, fields);

          const fieldErrorsToDisplay = getFieldErrorsToDisplay(
            fields,
            displayErrorsFromStart,
          );
          const displayFormErrors = shouldDisplayFormErrors(
            formErrors,
            displayErrorsFromStart,
            false,
          );
          const disabled = updateDisableStatus(
            false,
            displayErrorsFromStart,
            fields,
            formErrors,
          );

          if (pristine) { this.setFormProperty('pristine', false); }
          this.setFormProperty('fields', fields);
          this.setFormProperty('fieldErrorsToDisplay', fieldErrorsToDisplay);
          this.setFormProperty('displayFormErrors', displayFormErrors);
          this.setFormProperty('formErrors', formErrors);
          this.setFormProperty('disabled', disabled);

          userFunction();
        }
      }
    }

    handleSubmit(onSubmit = () => {}) {
      return (e) => {
        const { fields, formErrors } = this.state;
        const { displayErrorsFromStart } = this.params;
        const finalValues = getFinalValues(fields);

        if (displayErrorsFromStart) {
          onSubmit(finalValues);
        } else {
          const updatedFields = updateFieldsPostSubmit(fields);
          let fieldErrors = hasFieldErrors(updatedFields);

          if (!fieldErrors && !Object.keys(formErrors).length) {
            onSubmit(finalValues);
          } else {
            const fieldErrorsToDisplay = getFieldErrorsToDisplay(
              updatedFields,
              displayErrorsFromStart,
            );
            const displayFormErrors = shouldDisplayFormErrors(
              formErrors,
              displayErrorsFromStart,
              false,
            );
            const disabled = updateDisableStatus(
              false,
              displayErrorsFromStart,
              updatedFields,
              formErrors,
            );

            this.setFormProperty('fields', updatedFields);
            this.setFormProperty('pristine', false);
            this.setFormProperty('disabled', disabled);
            this.setFormProperty('fieldErrorsToDisplay', fieldErrorsToDisplay);
            this.setFormProperty('displayFormErrors', displayFormErrors);
          }
        }
        e.preventDefault();
      }
    }

    render() {
      const formProps = {
        ...this.state,
        formName: this.params.formName,
        handleSubmit: this.handleSubmit,
        onFieldChange: this.onFieldChange,
      }

      return <ComposedComponent { ...formProps } />
    }
  }

  Form.childContextTypes = {
    displayErrorsFromStart: PropTypes.bool,
    fields: PropTypes.shape(),
    onFieldChange: PropTypes.func,
  };

  return Form;
}
