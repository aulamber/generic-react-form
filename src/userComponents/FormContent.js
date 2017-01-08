import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

import Input from './Input'
import FieldErrors from './FieldErrors'
import FormErrors from './FormErrors'
import SubmitButton from './SubmitButton'

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
    const styles = {
      form: {
        width: '360px',
        padding: '20px 0',
        backgroundColor: (this.props.disabled ? '#f2f2f2' : '#b3ffb3'),
        borderRadius: '10px',
      },
      label: {
        marginTop: '30px'
      },
    }

    return (
      <div style={styles.form}>
      <FormErrors />

      <p style={styles.label} >AMOUNT 1:</p>
      <Input name="amount1" />
      <FieldErrors name="amount1" />

      <p style={styles.label} >AMOUNT 2:</p>
      <Input name="amount2" />
      <FieldErrors name="amount2" />

      <p style={styles.label} >AMOUNT 3:</p>
      <Input name="amount3" />
      <FieldErrors name="amount3" />

      <p style={styles.label} >AMOUNT 4:</p>
      <Input name="amount4" />
      <FieldErrors name="amount4" />

      <SubmitButton onSubmit={this.context.handleSubmit(this.onSubmit)} />
      </div>
    )
  }
}

FormContent.contextTypes = {
  handleSubmit: PropTypes.func,
}

function mapStateToProps({ formReducer }) {
  return { disabled: formReducer.disabled };
}

export default connect(mapStateToProps)(FormContent);
