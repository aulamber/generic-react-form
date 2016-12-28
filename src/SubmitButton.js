import React, { PropTypes } from 'react';

function SubmitButton({ pristine, disabled, handleSubmit }) {
  return (
    <button type='submit' disabled={disabled && !pristine} onClick={handleSubmit}>
      SUBMIT
    </button>
  )
}

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
}

export default SubmitButton
