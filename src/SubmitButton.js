import React, { PropTypes } from 'react';

function SubmitButton({ displayErrorsFromStart, disabled, handleSubmit }) {
  return (
    <button
      type='submit'
      disabled={disabled}
      onClick={handleSubmit}
    >
      SUBMIT
    </button>
  )
}

SubmitButton.propTypes = {
  displayErrorsFromStart: PropTypes.bool,
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
}

export default SubmitButton
