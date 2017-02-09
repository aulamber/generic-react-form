/*
A FAIRE

1) Donner un nom à chaque formulaire et enregistrer la data au bon endroit dans redux
2) Enregistrer un état pristine de la data
3) Proposer de mettre la data à zéro
4) Utiliser reselect pour le filtre de fieldErrorsToDisplay
4) faire un composant de checkbox + radio + number + range (+ email ?)
(moins important): email, url, date, color, time
5) Enlever redux dans /form ??
6) Remettre dans l'ordre alpha tous les noms de variables + proptypes
7) Mettre tous les composants réutilisables (Input etc.) dans un fichier index.js
à la racine qui sera appelé sans /index dans le path
8) optimisation des perfs (limiter au max les boucles dans les boucles avec les forEach)
9) tests
10) doc + readme
11) passage en module npm

*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setParamsDefaultValues } from './utils/index';
import {
  updateDisableStatus,
  initializeFields,
  updateFieldValue,
  updateFieldsPostSubmit,
  updateFieldErrors,
  updateFormErrors,
  hasFieldErrors,
  getFinalValues,
} from './stateHandling/index';
import * as actions from './actions/index';
import getFieldErrorsToDisplay from '../form/utils/fieldErrorsToDisplay';
import hasFormErrorsToDisplay from '../form/utils/hasFormErrorsToDisplay';

export default function createForm({ ...params }, ComposedComponent) {
  class Form extends Component {
    constructor(props) {
      super(props);

      params = setParamsDefaultValues(params);

      this.onFieldChange = this.onFieldChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    getChildContext() {
      return {
        displayErrorsFromStart: params.displayErrorsFromStart,
        fieldChecks: params.fieldChecks,
        formChecks: params.formChecks,
        onFieldChange: this.onFieldChange,
        handleSubmit: this.handleSubmit,
      };
    }

    componentWillMount() {
      const { actions, pristine } = this.props;
      const { displayErrorsFromStart, initialFields, fieldChecks, formChecks } = params;
      const fields = initializeFields(initialFields, fieldChecks);
      const fieldErrorsToDisplay = getFieldErrorsToDisplay(
        fields,
        displayErrorsFromStart,
      );
      const formErrors = updateFormErrors({}, formChecks, fields);
      const formErrorsToDisplay = hasFormErrorsToDisplay(
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

      actions.setFields(fields);
      actions.setFieldErrorsToDisplay(fieldErrorsToDisplay);
      actions.setHasFormErrorToDisplay(formErrorsToDisplay);
      actions.setFormErrors(formErrors);
      actions.setDisableStatus(disabled);
    }

    onFieldChange(name) {
      return (e) => {
        const { pristine, actions } = this.props;
        const { displayErrorsFromStart, fieldChecks, formChecks } = params;
        const value = e.target.value;
        let fields = this.props.fields;
        let formErrors = this.props.formErrors;

        fields = updateFieldValue(name, value, fields);
        fields = updateFieldErrors(name, value, fields, fieldChecks[name]);
        fields = updateFieldErrors(name, value, fields, fieldChecks.comparChecks, true);
        formErrors = updateFormErrors(formErrors, formChecks, fields);
        const fieldErrorsToDisplay = getFieldErrorsToDisplay(
          fields,
          displayErrorsFromStart,
        );
        const formErrorsToDisplay = hasFormErrorsToDisplay(
          formErrors,
          displayErrorsFromStart,
          pristine,
        );
        const disabled = updateDisableStatus(
          false,
          displayErrorsFromStart,
          fields,
          formErrors,
        );

        if (pristine) { actions.setFormPristine(); }
        actions.setFields(fields);
        actions.setFieldErrorsToDisplay(fieldErrorsToDisplay);
        actions.setHasFormErrorToDisplay(formErrorsToDisplay);
        actions.setFormErrors(formErrors);
        actions.setDisableStatus(disabled);
      }
    }

    handleSubmit(onSubmit = () => {}) {
      return (e) => {
        const { actions, fields, formErrors } = this.props;
        const { displayErrorsFromStart } = params;
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
            const formErrorsToDisplay = hasFormErrorsToDisplay(
              formErrors,
              displayErrorsFromStart,
              false,
            );

            actions.setFields(updatedFields);
            actions.setFormPristine();
            actions.setDisableStatus(updateDisableStatus(
              false,
              displayErrorsFromStart,
              updatedFields,
              formErrors,
            ));
            actions.setFieldErrorsToDisplay(fieldErrorsToDisplay);
            actions.setHasFormErrorToDisplay(formErrorsToDisplay);
          }
        }
        e.preventDefault();
      }
    }

    render() {
      return <ComposedComponent />;
    }
  }

  Form.propTypes = {
    pristine: PropTypes.bool,
    disabled: PropTypes.bool,
    formErrors: PropTypes.shape().isRequired,
    fields: PropTypes.shape().isRequired,
  };

  Form.childContextTypes = {
    displayErrorsFromStart: PropTypes.bool,
    fieldChecks: PropTypes.shape(),
    formChecks: PropTypes.arrayOf(PropTypes.func),
    onFieldChange: PropTypes.func,
    handleSubmit: PropTypes.func,
  };

  function mapStateToProps({ formReducer }) {
    const { pristine, disabled, fields, formErrors } = formReducer;

    return { pristine, disabled, fields, formErrors };
  }

  function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
  }

  return connect(mapStateToProps, mapDispatchToProps)(Form);
}
