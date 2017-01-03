import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  isTooLong,
  isNumber,
  isDifferentFrom,
  hasEmptyFields,
  isSumWithinRange,
} from './utils/checks'

import './App.css';
import Form from './form/components/Form'
import FormWrapper from './userComponents/FormWrapper'
import Input from './form/components/Input'
import Label from './userComponents/Label'
import FieldErrors from './userComponents/FieldErrors'
import FormErrors from './userComponents/FormErrors'
import SubmitButton from './userComponents/SubmitButton'

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

    const { amount1, amount2, amount3, amount4 } = this.props.fields

    this.state = {
      fields: {
        amount1: { value : amount1, isRequired: true },
        amount2: { value : amount2, isRequired: true },
        amount3: { value: amount3, isRequired: true },
        amount4: { value: amount4, isRequired: false },
      },
      formErrors: {},
      disabled: true,
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    console.log('Form submitted');
    console.log('Values = ', values);
  }

  render() {
    const styles = {
      app: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '60px'
      },
      form: {
        width: '360px',
        padding: '20px 0',
        backgroundColor: (this.props.disabled ? '#f2f2f2' : '#b3ffb3'),
        borderRadius: '10px',
      }
    }

    if (!this.state.fields) { return <div>Loading...</div> }

    return (
      <div className="App" style={styles.app}>
        <Form
          name="myFirstForm"
          initialFields={this.state.fields}
          fieldChecks={fieldChecks}
          formChecks={formChecks}
          displayErrorsFromStart={true}
          onSubmit={this.onSubmit}
        >
          <FormWrapper styles={styles.form}>
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
          </FormWrapper>
        </Form>
      </div>
    );
  }
}

Form.propTypes = {
  disabled: PropTypes.bool,
  fields: PropTypes.shape(),
}

function mapStateToProps({ appReducer, formReducer }) {
  return { disabled: formReducer.disabled, fields: appReducer,  };
}

export default connect(mapStateToProps)(App);
