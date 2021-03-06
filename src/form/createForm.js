/*
A FAIRE

1) Ajouter linter
2) Enregistrer un état pristine de la data
3) Proposer de mettre la data à zéro
4) faire un composant de select + checkbox + textarea + radio/radiogroup
+ number + range (+ email ?) (moins important): email, url, date, color, time
5) Remettre dans l'ordre alpha tous les noms de variables + proptypes
6) optimisation des perfs (limiter au max les boucles dans les boucles avec les forEach)
7) comparer à redux form
8) tests
9) doc + readme
10) passage en module npm
*/

import React, { Component } from 'react';

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

import Input from '../form/Input'


export default function createForm({ ...params }, ComposedComponent) {
  class Form extends Component {
    constructor(props) {
      super(props);

      this.state = {
        disabled: true,
        displayErrorsFromStart: params.displayErrorsFromStart,
        displayFormErrors: false,
        fields: {},
        fieldErrorsToDisplay: {},
        formErrors: {},
        pristine: true,
      }

      this.params = setParamsDefaultValues(params);

      this.getInitialData = this.getInitialData.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onFieldChange = this.onFieldChange.bind(this);
      this.renderInput = this.renderInput.bind(this);
      this.resetInitialData = this.resetInitialData.bind(this);
      this.resetDataEmpty = this.resetDataEmpty.bind(this);
      this.setFormProperties = this.setFormProperties.bind(this);
    }

    componentWillMount() {
      const { pristine } = this.state;
      const { initialFields, fieldChecks, formChecks } = this.params;

      const fields = initializeFields(initialFields, fieldChecks);
      const formErrors = updateFormErrors({}, formChecks, fields);
      const initialData = this.setFormProperties({ fields, formErrors, pristine });

      this.setState({ initialData });
    }

    getInitialData() {
      return this.state.initialData;
    }

    resetInitialData() {
      this.setState(this.state.initialData);
    }

    resetDataEmpty() {
      const { fields } = this.state.initialData;
      let resetFields = {};
      let fieldErrorsToDisplay = {};

      Object.keys(this.state.fieldErrorsToDisplay)
        .forEach(field => {
          fieldErrorsToDisplay = { ...fieldErrorsToDisplay, [field]: {} };
        })

      Object.keys(fields).forEach(field => {
        resetFields = {
          ...resetFields,
          [field]: { ...fields[field], value: '', pristine: true },
        }
      });

      this.setState({
        ...this.state.initialData,
        fieldErrorsToDisplay,
        fields: resetFields,
        displayErrorsFromStart: false,
      })
    }

    setFormProperties({ fields, formErrors, pristine }) {
      const fromStart = this.state.displayErrorsFromStart;
      const state = {
        disabled: updateDisableStatus(pristine, fromStart, fields, formErrors),
        displayErrorsFromStart: fromStart,
        displayFormErrors: shouldDisplayFormErrors(formErrors, fromStart, pristine),
        fields,
        fieldErrorsToDisplay: getFieldErrorsToDisplay(fields, fromStart),
        formErrors,
        pristine,
      };

      this.setState(state);

      return state;
    }

    onFieldChange(userFunction = () => {}) {
      return (name) => {
        return (e) => {
          const { fieldChecks, formChecks } = this.params;
          const value = e.target.value;
          const pristine = false;

          let fields = this.state.fields;
          fields = updateFieldValue(name, value, fields);
          fields = updateFieldErrors(name, value, fields, fieldChecks[name]);
          fields = updateFieldErrors(name, value, fields, fieldChecks.comparChecks, true);

          let formErrors = this.state.formErrors;
          formErrors = updateFormErrors(formErrors, formChecks, fields);

          this.setFormProperties({ fields, formErrors, pristine });

          userFunction();
        }
      }
    }

    handleSubmit(onSubmit = () => {}) {
      return (e) => {
        let fields = this.state.fields;
        const { displayErrorsFromStart, formErrors } = this.state;
        const finalValues = getFinalValues(fields);
        const pristine = false;

        if (displayErrorsFromStart) {
          onSubmit(finalValues);
          this.resetDataEmpty();
        } else {
          fields = updateFieldsPostSubmit(fields);
          let fieldErrors = hasFieldErrors(fields);

          if (!fieldErrors && !Object.keys(formErrors).length) {
            onSubmit(finalValues);
            this.resetDataEmpty();
          } else {
            this.setFormProperties({ fields, formErrors, pristine });
          }
        }
        e.preventDefault();
      }
    }

    renderInput(userProps) {
      const inputProps = {
        ...userProps,
        displayErrorsFromStart: this.state.displayErrorsFromStart,
        fields: this.state.fields,
        onFieldChange: this.onFieldChange,
      };

      return <Input { ...inputProps } />
    }

    render() {
      console.log('this.state = ', this.state);
      const formProps = {
        ...this.state,
        formName: this.params.formName,
        handleSubmit: this.handleSubmit,
        renderInput: this.renderInput,
        onFieldChange: this.onFieldChange,
      }

      return <ComposedComponent { ...formProps } />
    }
  }

  return Form;
}
