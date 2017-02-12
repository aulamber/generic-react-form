import React, { PropTypes } from 'react'

import FieldErrors from './FieldErrors'
import FormErrors from './FormErrors'
import SubmitButton from './SubmitButton'
import styles from './style'

function onSubmit(values) {
  console.log('Form submitted');
  console.log('Values = ', values);
}

function FormContent({
  disabled,
  fieldErrorsToDisplay,
  formErrors,
  handleSubmit,
  displayFormErrors,
  renderInput,
}) {
  return (
    <div style={styles.form(disabled)}>
      <FormErrors
        formErrors={formErrors}
        displayFormErrors={displayFormErrors}
      />

      <p style={styles.label}>AMOUNT 1:</p>
      {renderInput({ name: 'amount1', placeholder: 'amount1', style: styles.input })}
      <FieldErrors name="amount1" fieldErrors={fieldErrorsToDisplay.amount1} />

      <p style={styles.label}>AMOUNT 2:</p>
      {renderInput({ name: 'amount2', placeholder: 'amount2', style: styles.input })}
      <FieldErrors name="amount2" fieldErrors={fieldErrorsToDisplay.amount2} />

      <p style={styles.label}>AMOUNT 3:</p>
      {renderInput({ name: 'amount3', placeholder: 'amount3', style: styles.input })}
      <FieldErrors name="amount3" fieldErrors={fieldErrorsToDisplay.amount3} />

      <p style={styles.label}>AMOUNT 4:</p>
      {renderInput({ name: 'amount4', placeholder: 'amount4', style: styles.input })}
      <FieldErrors name="amount4" fieldErrors={fieldErrorsToDisplay.amount4} />

      <SubmitButton disabled={disabled} onSubmit={handleSubmit(onSubmit)} />
    </div>
  )
}

FormContent.propTypes = {
  disabled: PropTypes.bool,
  fieldErrorsToDisplay: PropTypes.shape(),
  formErrors: PropTypes.shape(),
  handleSubmit: PropTypes.func,
  renderInput: PropTypes.func,
};

export default FormContent;
