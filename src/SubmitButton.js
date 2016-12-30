import React, { PropTypes } from 'react';

function SubmitButton({ displayErrorsFromStart, disabled, handleSubmit }) {
  console.log('Dans SubmitButton, disabled = ', disabled);
  return (
    <button
      type='submit'
      disabled={displayErrorsFromStart && disabled}
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
