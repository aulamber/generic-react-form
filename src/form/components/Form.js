/*
A FAIRE

1) Enlever le React.Children.map(this.props.children, ...)
2) Donner un nom à chaque formulaire et enregistrer la data au bon endroit dans redux
3) faire un composant de checkbox + radio + number + range (+ email ?)
(moins important): email, url, date, color, time
4) enlever tout le non paramétrable (style, balises) non accessible au user dans Form et Input
5) optimisation des perfs (limiter au max les boucles dans les boucles avec les forEach)
6) tests
7) doc + readme
8) passage en module npm

*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';
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

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getChildContext() {
    return {
      displayErrorsFromStart: this.props.displayErrorsFromStart,
      fieldChecks: this.props.fieldChecks,
      formChecks: this.props.formChecks,
    };
  }

  componentWillMount() {
    const { displayErrorsFromStart, initialFields, fieldChecks,
            formChecks, actions } = this.props
    const fields = initializeFields(initialFields, fieldChecks)
    const formErrors = updateFormErrors({}, formChecks, fields)
    const disabled = updateDisableStatus(true, displayErrorsFromStart, fields, formErrors)

    actions.setFields(fields)
    actions.setFormErrors(formErrors)
    actions.setDisableStatus(disabled)
  }

  handleSubmit(e) {
    const { fields, formErrors, displayErrorsFromStart,
            onSubmit, actions } = this.props
    const finalValues = getFinalValues(fields)

    if (displayErrorsFromStart) {
      onSubmit(finalValues)
    } else {
      let fieldErrors = hasFieldErrors(fields)
      const updatedFields = updateFieldsPostSubmit(fields)

      if (!fieldErrors && !Object.keys(formErrors).length) {
        onSubmit(finalValues)
      } else {
        actions.setFields(updatedFields)
        actions.setFormPristine()
        actions.setDisableStatus(updateDisableStatus(
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
    return (
      <div>
        {/*
          React.Children.map(
            this.props.children,
            child => React.cloneElement(child, {
              handleSubmit: this.handleSubmit,
            })
          )
        */}
        {this.props.children}
      </div>
    )
  }
}

Form.defaultProps = {
  displayErrorsFromStart: false,
};

Form.childContextTypes = {
  fieldChecks: PropTypes.shape(),
  formChecks: PropTypes.arrayOf(PropTypes.func),
  displayErrorsFromStart: PropTypes.bool,
};

Form.propTypes = {
  pristine: PropTypes.bool,
  disabled: PropTypes.bool,
  formErrors: PropTypes.shape().isRequired,
  initialFields: PropTypes.shape().isRequired,
  fields: PropTypes.shape().isRequired,
  fieldChecks: PropTypes.shape().isRequired,
  formChecks: PropTypes.arrayOf(PropTypes.func),
  displayErrorsFromStart: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}

function mapStateToProps({ formReducer }) {
  const { pristine, disabled, fields, formErrors } = formReducer;

  return { pristine, disabled, fields, formErrors };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
