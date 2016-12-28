import React, { Component } from 'react';

import {
  isTooLong,
  isDifferentFrom,
  hasEmptyFields,
  isSumWithinRange,
} from './checks'

import './App.css';
import Form from './form/Form'
import Input from './form/Input'
import FieldErrors from './FieldErrors'
import FormErrors from './FormErrors'
import SubmitButton from './SubmitButton'

// Fields to be injected inside the form
const fields = {
  firstName: { value : '', isRequired: true },
  lastName: { value: '', isRequired: true },
}

// Verifications to be done for each field
const fieldChecks = {
  firstName: [
    { func: isTooLong(6) },
    { func: isDifferentFrom('firstName'), fieldToCompare: 'lastName', fieldWithError: 'lastName' },
  ],
  lastName: [
    { func: isTooLong(6) },
    { func: isDifferentFrom('firstName'), fieldToCompare: 'firstName', fieldWithError: 'lastName' },
  ],
}

// Verifications to be done for the whole form
const formChecks = [ hasEmptyFields, isSumWithinRange(0, 100) ]


class App extends Component {
  constructor(props) {
    super(props)

    this.state = { fields, formErrors: [], disabled: true }

    this.getFields = this.getFields.bind(this)
    this.getFormErrors = this.getFormErrors.bind(this)
    this.getDisabledStatus = this.getDisabledStatus.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }

  getFields(fields) {
    this.setState({ fields })
  }

  getFormErrors(formError) {
    this.setState({ formError })
  }

  getDisabledStatus(disabled) {
    this.setState({ disabled })
  }

  onSubmit(values) {
    console.log('Form submitted');
    console.log('Values = ', values);
  }

  render() {
    return (
      <div className="App">
        <Form
          fields={this.state.fields}
          fieldChecks={fieldChecks}
          formChecks={formChecks}
          displayErrorsFromStart={true}
          giveFieldsToParent={this.getFields}
          giveFormErrorsToParent={this.getFormErrors}
          giveDisabledStatusToParent={this.getDisabledStatus}
          onSubmit={this.onSubmit}
        >
          <Input name="firstName" fieldChecks={fieldChecks.firstName} />
          <FieldErrors name="firstName" />

          <Input name="lastName" fieldChecks={fieldChecks.lastName} />
          <FieldErrors name="lastName" />

          <FormErrors />

          <SubmitButton onSubmit={this.onSubmit} />
        </Form>
      </div>
    );
  }
}

export default App;
