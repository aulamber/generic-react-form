import React from 'react';
import PropTypes from 'prop-types';

import { isObjectEmpty } from '../form/utils';
import styles from './style';

function FirstFormContent({ formProps }) {
  const { disabled, fields, formErrors, handleChange, handleSubmit } = formProps;
  const { amount1, amount2, amount3, amount4 } = fields;

  const isFieldError = {
    amount1: !isObjectEmpty(amount1.errors),
    amount2: !isObjectEmpty(amount2.errors),
    amount3: !isObjectEmpty(amount3.errors),
    amount4: !isObjectEmpty(amount4.errors),
  };

  const fieldErrorsToDisplay = errors => (
    <div style={styles.fieldErrors}>
      {Object.keys(errors).map(error => <p key={error}>{errors[error].message}</p>)}
    </div>
  );

  const formErrorsToDisplay = (formErrors
    ? (
      <div style={styles.formErrors.container}>
        <p style={styles.formErrors.title}>FORM ERRORS</p>
        {Object.keys(formErrors).map(error => <p key={error}>{formErrors[error]}</p>)}
      </div>
    )
    : null
  );

  return (
    <div style={styles.top}>
      <div style={styles.form(disabled)}>
        {!isObjectEmpty(formErrors) ? formErrorsToDisplay : null}

        <div>
          <p style={styles.label}>Amount 1</p>
          <input
            onChange={handleChange('amount1')}
            style={isFieldError.amount1 ? styles.field.error : styles.field.regular}
            value={amount1.value}
          />
          {isFieldError.amount1 ? fieldErrorsToDisplay(amount1.errors) : null}
        </div>

        <div>
          <p style={styles.label}>Amount 2</p>
          <input
            onChange={handleChange('amount2')}
            style={isFieldError.amount2 ? styles.field.error : styles.field.regular}
            value={amount2.value}
          />
          {isFieldError.amount2 ? fieldErrorsToDisplay(amount2.errors) : null }
        </div>

        <div>
          <p style={styles.label}>Amount 3</p>
          <input
            onChange={handleChange('amount3')}
            style={isFieldError.amount3 ? styles.field.error : styles.field.regular}
            value={amount3.value}
          />
          {isFieldError.amount3 ? fieldErrorsToDisplay(amount3.errors) : null }
        </div>

        <div>
          <p style={styles.label}>Amount 4</p>
          <input
            onChange={handleChange('amount4')}
            style={isFieldError.amount4 ? styles.field.error : styles.field.regular}
            value={amount4.value}
          />
          {isFieldError.amount4 ? fieldErrorsToDisplay(amount4.errors) : null }
        </div>

        <button
          disabled={disabled}
          onClick={handleSubmit()}
          style={styles.submit(disabled)}
        >SUBMIT</button>
      </div>
    </div>
  );
}

FirstFormContent.propTypes = {
  formProps: PropTypes.shape({
    disabled: PropTypes.bool,

    fields: PropTypes.shape({
      amount1: PropTypes.shape({
        errors: PropTypes.shape().isRequired,
        pristine: PropTypes.bool,
        value: PropTypes.string.isRequired,
      }).isRequired,

      amount2: PropTypes.shape({
        errors: PropTypes.shape().isRequired,
        pristine: PropTypes.bool,
        value: PropTypes.string.isRequired,
      }).isRequired,

      amount3: PropTypes.shape({
        errors: PropTypes.shape().isRequired,
        pristine: PropTypes.bool,
        value: PropTypes.string.isRequired,
      }).isRequired,

      amount4: PropTypes.shape({
        errors: PropTypes.shape().isRequired,
        isRequired: PropTypes.bool,
        pristine: PropTypes.bool,
        value: PropTypes.string.isRequired,
      }).isRequired,
    }),

    formErrors: PropTypes.shape(),
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
  }).isRequired,
};

export default FirstFormContent;
