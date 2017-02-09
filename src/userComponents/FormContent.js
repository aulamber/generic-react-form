import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

import Input from '../form/Input'
import FieldErrors from './FieldErrors'
import FormErrors from './FormErrors'
import SubmitButton from '../form/SubmitButton'
import styles from './style'


class FormContent extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    console.log('Form submitted');
    console.log('Values = ', values);
  }

  render() {
    return (
      <div style={styles.form(this.props.disabled)}>
        <FormErrors />

        <p style={styles.label} >AMOUNT 1:</p>
        <Input name="amount1" placeholder='amount1' style={styles.input} />
        <FieldErrors name="amount1" />

        <p style={styles.label} >AMOUNT 2:</p>
        <Input name="amount2" placeholder='amount2' style={styles.input} />
        <FieldErrors name="amount2" />

        <p style={styles.label} >AMOUNT 3:</p>
        <Input name="amount3" placeholder='amount3' style={styles.input} />
        <FieldErrors name="amount3" />

        <p style={styles.label} >AMOUNT 4:</p>
        <Input name="amount4" placeholder='amount4' style={styles.input} />
        <FieldErrors name="amount4" />

        <SubmitButton
          onSubmit={this.context.handleSubmit(this.onSubmit)}
          style={styles.submitButton}
        />
      </div>
    )
  }
}

function mapStateToProps({ formReducer }) {
  return {
    disabled: formReducer.disabled,
    formErrors: formReducer.formErrors,
  };
}

FormContent.contextTypes = { handleSubmit: PropTypes.func };

export default connect(mapStateToProps)(FormContent);
