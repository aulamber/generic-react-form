import React from 'react';
import PropTypes from 'prop-types';

function FirstFormContent({ formProps }) {
  const { disabled, fields, formErrors, handleChange, handleSubmit } = formProps;
  const { amount1, amount2, amount3, amount4 } = fields;

  const formErrorsToDisplay = (formErrors
    ? Object.keys(formErrors).map(error => <p key={error}>{formErrors[error]}</p>)
    : null
  );

  return (
    <div>
      <div>
        <p>Amount 1</p>
        <input value={amount1.value} onChange={handleChange('amount1')} />
        {amount1.errors
          ? <p>Il y a une erreur TODO</p>
          : null
        }
      </div>

      <div>
        <p>Amount 2</p>
        <input value={amount2.value} onChange={handleChange('amount2')} />
        {amount2.errors
          ? <p>Il y a une erreur TODO</p>
          : null
        }
      </div>

      <div>
        <p>Amount 3</p>
        <input value={amount3.value} onChange={handleChange('amount3')} />
        {amount3.errors
          ? <p>Il y a une erreur TODO</p>
          : null
        }
      </div>

      <div>
        <p>Amount 4</p>
        <input value={amount4.value} onChange={handleChange('amount4')} />
        {amount4.errors
          ? <p>Il y a une erreur TODO</p>
          : null
        }
      </div>

      {formErrors ? formErrorsToDisplay : null}

      <button disabled={disabled} onClick={handleSubmit()}>SUBMIT</button>
    </div>
  );
}

FirstFormContent.propTypes = {
  formProps: PropTypes.shape({
    disabled: PropTypes.bool,

    fields: PropTypes.shape({
      amount1: PropTypes.shape({
        checks: PropTypes.arrayOf(PropTypes.func.isRequired),
        errors: PropTypes.shape(), // TODO: fill the shape()
        isRequired: PropTypes.bool.isRequired,
        pristine: PropTypes.bool,
        value: PropTypes.string,
      }).isRequired,

      amount2: PropTypes.shape({
        checks: PropTypes.arrayOf(PropTypes.func.isRequired),
        errors: PropTypes.shape(), // TODO: fill the shape()
        isRequired: PropTypes.bool.isRequired,
        pristine: PropTypes.bool,
        value: PropTypes.string,
      }).isRequired,

      amount3: PropTypes.shape({
        checks: PropTypes.arrayOf(PropTypes.func.isRequired),
        errors: PropTypes.shape(), // TODO: fill the shape()
        isRequired: PropTypes.bool.isRequired,
        pristine: PropTypes.bool,
        value: PropTypes.string,
      }).isRequired,

      amount4: PropTypes.shape({
        checks: PropTypes.arrayOf(PropTypes.func.isRequired),
        errors: PropTypes.shape(), // TODO: fill the shape()
        isRequired: PropTypes.bool,
        pristine: PropTypes.bool,
        value: PropTypes.string,
      }).isRequired,
    }),

    formErrors: PropTypes.shape(),
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
  }).isRequired,
};

export default FirstFormContent;
