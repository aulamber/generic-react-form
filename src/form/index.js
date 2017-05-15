import _ from 'lodash';
import React, { Component } from 'react';

import {
  getFinalValues,
  initializeFields,
  isDisabled,
  isObjectEmpty,
  setConfig,
  updateFieldErrors,
  updateFieldValue,
  updateFormErrors,
} from './utils';

const initialState = {
  disabled: false,
  formErrors: {},
  isPostSubmit: false,
  pristine: true,
};

export default function createForm({ config, ComposedComponent }) {
  class Form extends Component {
    constructor(props) {
      super(props);

      this.config = setConfig(config);
      this.state = initialState;

      this.handleBlur = this.handleBlur.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleField = this.handleField.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.resetInitialState = this.resetInitialState.bind(this);
      this.setFormState = this.setFormState.bind(this);
    }

    componentWillMount() {
      const { fieldConfig } = this.config;

      const fields = initializeFields(fieldConfig);

      this.setState({ fields, formErrors: {} });
    }

    setFormState(name, options) {
      const { setValue, setFieldErrors, setFormErrorsFor: setFormErrorsFor = 'all' } = options;
      const { fieldConfig, formChecks } = this.config;
      const prevFields = this.state.fields;
      let { fields, formErrors } = this.state;

      if (setValue !== undefined) {
        fields = updateFieldValue(fields, name, setValue);
      }

      if (setFieldErrors) {
        fields = updateFieldErrors(fields, fieldConfig[name].checks, name);
      }

      formErrors = updateFormErrors(prevFields, fields, formChecks, formErrors, setFormErrorsFor);
      const disabled = isDisabled(fields, formErrors, this.state.isPostSubmit);

      this.setState({ disabled, fields, formErrors, pristine: false });
    }

    handleBlur(name) {
      return () => {
        const options = { setFieldErrors: true };

        this.setFormState(name, options);
      };
    }

    handleChange(name, onChange = () => {}) {
      return (e) => {
        const options = {
          setValue: e.target.value,
          setFieldErrors: !isObjectEmpty(this.state.fields[name].errors),
          setFormErrorsFor: name,
        };

        this.setFormState(name, options);
        onChange();
      };
    }

    handleField(name, onChange = () => {}) {
      return (e) => {
        const options = { setValue: e.target.value, setFieldErrors: true };

        this.setFormState(name, options);
        onChange();
      };
    }

    handleSubmit(onSubmit = () => {}) {
      return (e) => {
        const { fields, formErrors } = this.state;

        if (isObjectEmpty(formErrors)) {
          onSubmit(getFinalValues(fields));
          this.resetInitialState();
        } else {
          this.setState({ disabled: true, isPostSubmit: true });
        }

        e.preventDefault();
      };
    }

    resetInitialState() {
      this.setState({ ...initialState });
    }

    render() {
      // console.log('this.state = ', this.state);
      console.log('this.state.formErrors = ', this.state.formErrors);

      const { disabled, fields, formErrors, isPostSubmit, pristine } = this.state;
      const formProps = {
        disabled,
        fields,
        formErrors: (isPostSubmit ? formErrors : _.omit(formErrors, ['form'])),
        handleBlur: this.handleBlur,
        handleChange: this.handleChange,
        handleField: this.handleField,
        handleSubmit: this.handleSubmit,
        pristine,
      };

      return <ComposedComponent formProps={formProps} />;
    }
  }

  return Form;
}
