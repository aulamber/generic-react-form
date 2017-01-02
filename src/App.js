import React, { Component } from 'react';

import {
  isTooLong,
  isNumber,
  isDifferentFrom,
  hasEmptyFields,
  isSumWithinRange,
} from './utils/checks'

import './App.css';
import Form from './form/Form'
import Input from './form/Input'
import Label from './userComponents/Label'
import FieldErrors from './userComponents/FieldErrors'
import FormErrors from './userComponents/FormErrors'
import SubmitButton from './userComponents/SubmitButton'

// Fields to be injected inside the form
const fields = {
  amount1: { value : 'e', isRequired: true },
  amount2: { value : 'e', isRequired: true },
  amount3: { value: 'e', isRequired: true },
  amount4: { value: 'e', isRequired: true },
}

// Verifications to be done for each field, individually and compared to others
const fieldChecks = {
  amount1: [ isTooLong(6), isNumber ],
  amount2: [ isTooLong(6), isNumber ],
  amount3: [ isTooLong(6), isNumber ],
  amount4: [ isTooLong(6), isNumber ],

  comparChecks: [
    {
      func: isDifferentFrom(true),
      fieldsToCompare: ['amount2', 'amount3'],
      comparedField: 'amount1',
    },
    {
      func: isDifferentFrom(false),
      fieldsToCompare: ['amount3'],
      comparedField: 'amount2',
    },
  ],
}

// Verifications to be done for the whole form
const formChecks = [ hasEmptyFields, isSumWithinRange(0, 100) ]


class App extends Component {
  constructor(props) {
    super(props)

    this.state = { fields, formErrors: {}, disabled: true }

    this.getFields = this.getFields.bind(this)
    this.getFormErrors = this.getFormErrors.bind(this)
    this.getDisabledStatus = this.getDisabledStatus.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  getFields(fields) {
    this.setState({ fields })
  }

  getFormErrors(formErrors) {
    this.setState({ formErrors })
  }

  getDisabledStatus(disabled) {
    this.setState({ disabled })
  }

  onSubmit(values) {
    console.log('Form submitted');
    console.log('Values = ', values);
  }

  render() {
    const styles = {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '60px'
    }

    return (
      <div className="App" style={styles}>
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
          <FormErrors />

          <Label label="AMOUNT 1:" />
          <Input name="amount1" />
          <FieldErrors name="amount1" />

          <Label label="AMOUNT 2:" />
          <Input name="amount2" />
          <FieldErrors name="amount2" />

          <Label label="AMOUNT 3:" />
          <Input name="amount3" />
          <FieldErrors name="amount3" />

          <Label label="AMOUNT 4:" />
          <Input name="amount4" />
          <FieldErrors name="amount4" />

          <SubmitButton />
        </Form>
      </div>
    );
  }
}

export default App;
