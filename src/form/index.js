import React, { Component } from 'react';

import {
  getFinalValues,
  initializeFields,
  isDisabled,
  setFieldData,
  setFormErrors,
  setParamDefaultValues,
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

      this.config = setParamDefaultValues(config);
      this.state = initialState;

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.resetInitialState = this.resetInitialState.bind(this);
    }

    componentWillMount() {
      const { fieldConfig, formChecks } = this.config;

      const fields = initializeFields(fieldConfig);
      const formErrors = setFormErrors(fields, formChecks);

      this.setState({ fields, formErrors });
    }

    handleChange(name, onChange = () => {}) {
      return (e) => {
        const { value } = e.target;
        const { /* comparFieldsChecks,*/ fieldConfig, formChecks } = this.config;
        let { fields, formErrors } = this.state;

        fields = {
          ...fields,
          [name]: setFieldData(value, fields[name], fieldConfig[name].checks),
        };
        // fields = setComparFieldsErrors(name, value, fields, comparFieldsChecks, true/* , fieldChecks.comparChecks*/);
        formErrors = setFormErrors(fields, formChecks, formErrors);

        const disabled = isDisabled(fields, formErrors, this.state.isPostSubmit);

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
          this.setState({ disabled: true, isPostSubmit: true });
        }

        e.preventDefault();
      };
    }

    resetInitialState() {
      this.setState({ ...initialState });
    }

    render() {
      const { disabled, fields, formErrors, isPostSubmit, pristine } = this.state;
      const formProps = {
        disabled,
        fields,
        formErrors: (isPostSubmit ? formErrors : {}),
        handleChange: this.handleChange,
        handleSubmit: this.handleSubmit,
        pristine,
      };

      return <ComposedComponent formProps={formProps} />;
    }
  }

  return Form;
}
