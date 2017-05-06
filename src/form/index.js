import React, { Component } from 'react';

import {
  getFinalValues,
  initializeFields,
  isDisabled,
  setFieldErrors,
  setFieldValue,
  setFormErrors,
  setParamDefaultValues,
} from './utils';

const initialState = {
  disabled: false,
  displayFormErrors: false,
  fields: {},
  // fieldErrorsToDisplay: {},
  formErrors: {},
  pristine: true,
};

export default function createForm({ config, ComposedComponent }) {
  class Form extends Component {
    constructor(props) {
      super(props);

      this.config = setParamDefaultValues(config);
      this.state = initialState;

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.resetInitialState = this.resetInitialState.bind(this);
    }

    componentWillMount() {
      const { fieldConfig, formChecks } = this.config;

      const fields = initializeFields(fieldConfig);
      const formErrors = setFormErrors(formChecks, fields);

      this.setState({ fields, formErrors });
    }

    handleChange(name, onChange = () => {}) {
      return (e) => {
        const { /* comparFieldsChecks,*/ formChecks } = this.config;
        const value = e.target.value;

        const fields = setFieldValue(name, value, this.state.fields);
        // fields = setFieldErrors(name, value, fields/* , fieldChecks[name]*/);
        // fields = setComparFieldsErrors(name, value, fields, comparFieldsChecks, true/* , fieldChecks.comparChecks*/);

        const formErrors = setFormErrors(formChecks, fields);
        const disabled = isDisabled(fields);

        this.setState({ disabled, fields, formErrors, pristine: false });

        onChange();
      };
    }

    handleSubmit(onSubmit = () => {}) {
      return (e) => {
        const { fields, formErrors } = this.state;

        if (!Object.keys(formErrors).length) {
          onSubmit(getFinalValues(fields));
          this.resetInitialState();
        } else {
          this.setState({ displayFormErrors: true });
        }

        e.preventDefault();
      };
    }

    resetInitialState() {
      this.setState({ initialState });
    }

    render() {
      const { disabled, displayFormErrors, fields, formErrors, pristine } = this.state;
      const formProps = {
        disabled,
        fields,
        formErrors: (displayFormErrors ? formErrors : null),
        handleChange: this.handleChange,
        handleSubmit: this.handleSubmit,
        pristine,
      };

      return <ComposedComponent formProps={formProps} />;
    }
  }

  return Form;
}
