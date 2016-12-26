import React, { Component } from 'react';

import { isTooLong, isDifferentFrom } from './checks'

import './App.css';
import Form from './Form'
import Input from './Input'
import FieldErrors from './FieldErrors'
import FormErrors from './FormErrors'

// Fields to be injected inside the form
const fields = {
  firstName: { value : 'eeeeeeee', isRequired: true },
  lastName: { value: 'eeeeeeee', isRequired: false },
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


class App extends Component {
  constructor(props) {
    super(props)

    this.state = { fields, formError: '', disabled: true }

    this.getFields = this.getFields.bind(this)
    this.getFormError = this.getFormError.bind(this)
    this.getDisabledStatus = this.getDisabledStatus.bind(this)
  }

  getFields(fields) {
    // console.log('Dans APP, fields = ', fields);
    this.setState({ fields })
  }

  getFormError(formError) {
    this.setState({ formError })
  }

  getDisabledStatus(disabled) {
    this.setState({ disabled })
  }

  render() {
    const {fields/*, disabled*/} = this.state

    console.log('les champs du formulaire = ', fields);

    return (
      <div className="App">
        <Form
          fields={fields}
          fieldChecks={fieldChecks}
          formChecks={[]}
          giveFieldsToParent={this.getFields}
          giveFormErrorToParent={this.getFormError}
          giveDisabledStatusToParent={this.getDisabledStatus}
        >
          <Input name="firstName" fieldChecks={fieldChecks.firstName} />
          <FieldErrors name="firstName" />

          <Input name="lastName" fieldChecks={fieldChecks.lastName} />
          <FieldErrors name="lastName" />
        </Form>

        <FormErrors />

        <button type='submit' disabled={this.state.disabled}> SUBMIT </button>
      </div>
    );
  }
}

export default App;
