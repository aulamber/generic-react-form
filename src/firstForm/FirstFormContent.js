import React from 'react';

import { isObjectEmpty } from '../form/utils';
import styles from './style';
import { Select } from './fieldTypes';
import proptypes from './proptypes';

function FirstFormContent({ formProps }) {
  const { disabled, fields, formErrors, handleBlur, handleChange, handleField, handleSubmit } = formProps; // eslint-disable-line
  const { amount1, amount2, amount3, amount4, select } = fields;

  const isFieldError = fieldErrors => !isObjectEmpty(fieldErrors);
  const isComparError = comparErrors => comparErrors && comparErrors.length;

  const hasError = {
    amount1: { field: isFieldError(amount1.errors), compar: isComparError(formErrors.amount1) },
    amount2: { field: isFieldError(amount2.errors), compar: isComparError(formErrors.amount2) },
    amount3: { field: isFieldError(amount3.errors), compar: isComparError(formErrors.amount3) },
    amount4: { field: isFieldError(amount4.errors), compar: isComparError(formErrors.amount4) },
    form: { compar: isComparError(formErrors.form) },
    select: { field: isFieldError(select.errors), compar: isComparError(formErrors.select) },
  };

  const fieldErrorsToDisplay = fieldName => (hasError[fieldName].field
    ? <div style={styles.fieldErrors}>
      {Object.keys(fields[fieldName].errors)
        .map(error => <p key={error}>{fields[fieldName].errors[error].message}</p>)
      }
    </div>
    : null
    );

  const formErrorsToDisplay = fieldName => (hasError[fieldName].compar
    ? <div style={styles.fieldErrors}>
      {formErrors[fieldName].map(error => <p key={error}>{error}</p>)}
    </div>
    : null
  );

  const regularInput = (fieldName, text) => {
    const field = fields[fieldName];
    const style = (hasError[fieldName].field || hasError[fieldName].compar
      ? styles.field.error
      : styles.field.regular
    );

    return (
      <div>
        <p style={styles.label}>{text}</p>
        <input
          onBlur={handleBlur(fieldName)}
          onChange={handleChange(fieldName)}
          style={style}
          value={field.value}
        />
        {fieldErrorsToDisplay(fieldName)}
        {formErrorsToDisplay(fieldName)}
      </div>
    );
  };

  return (
    <div style={styles.top}>
      <div style={styles.form(disabled)}>
        {formErrors.form && formErrors.form.length
          ? <div style={styles.formErrors.container}>
            <p style={styles.formErrors.title}>FORM ERRORS</p>
            {formErrorsToDisplay('form')}
          </div>
          : null
        }

        <div>
          <p style={styles.label}>Select field</p>
          <Select
            hasError={hasError.select.field || hasError.select.compar}
            handleField={handleField('select')}
            options={['Bordeaux', 'Grenoble', 'La Rochelle', 'Paris', 'Tours']}
            value={fields.select.value}
          />
          {fieldErrorsToDisplay('select')}
          {formErrorsToDisplay('select')}
        </div>

        {regularInput('amount1', 'Amount 1')}
        {regularInput('amount2', 'Amount 2')}
        {regularInput('amount3', 'Amount 3')}
        {regularInput('amount4', 'Amount 4')}

        <button
          disabled={disabled}
          onClick={handleSubmit()}
          style={styles.submit(disabled)}
        >SUBMIT</button>
      </div>
    </div>
  );
}

FirstFormContent.propTypes = proptypes;

export default FirstFormContent;
