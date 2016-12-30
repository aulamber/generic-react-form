import React, { Component } from 'react';

import {
  isTooLong,
  isNumber,
  isDifferentFrom,
  isSimilarTo,
  hasEmptyFields,
  isSumWithinRange,
} from './checks'

import './App.css';
import Form from './form/Form'
import Label from './Label'
import Input from './form/Input'
import FieldErrors from './FieldErrors'
import FormErrors from './FormErrors'
import SubmitButton from './SubmitButton'

// Fields to be injected inside the form
const fields = {

  amount1: { value : 'e', isRequired: true },
  amount2: { value : 'e', isRequired: true },
  amount3: { value: 'e', isRequired: true },
}

const fieldChecks = {
  amount1: [
    { func: isTooLong(6) },
    { func: isDifferentFrom('amount1'), fieldToCompare: 'amount2', fieldWithError: 'amount2' },
    { func: isDifferentFrom('amount1'), fieldToCompare: 'amount3', fieldWithError: 'amount3' },
    { func: isNumber },
  ],
  amount2: [
    { func: isTooLong(6) },
    { func: isDifferentFrom('amount1'), fieldToCompare: 'amount1', fieldWithError: 'amount2' },
    { func: isSimilarTo('amount2'), fieldToCompare: 'amount3', fieldWithError: 'amount3' },
    { func: isNumber },
  ],
  amount3: [
    { func: isTooLong(6) },
    { func: isDifferentFrom('amount1'), fieldToCompare: 'amount1', fieldWithError: 'amount3' },
    { func: isSimilarTo('amount2'), fieldToCompare: 'amount2', fieldWithError: 'amount3' },
    { func: isNumber },
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
    console.log('this.state = ', this.state);
    return (
      <div className="App">
        <Form
          fields={this.state.fields}
          fieldChecks={fieldChecks}
          formChecks={formChecks}
          displayErrorsFromStart={false}
          giveFieldsToParent={this.getFields}
          giveFormErrorsToParent={this.getFormErrors}
          giveDisabledStatusToParent={this.getDisabledStatus}
          onSubmit={this.onSubmit}
        >
          <Label label="AMOUNT 1:" />
          <Input name="amount1" />
          <FieldErrors name="amount1" />

          <Label label="AMOUNT 2" />
          <Input name="amount2" />
          <FieldErrors name="amount2" />

          <Label label="AMOUNT 3:" />
          <Input name="amount3" />
          <FieldErrors name="amount3" />

          <FormErrors />

          <SubmitButton />
        </Form>
      </div>
    );
  }
}

export default App;
