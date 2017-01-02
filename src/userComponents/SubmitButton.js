import React, { PropTypes } from 'react';

function SubmitButton({ displayErrorsFromStart, disabled, handleSubmit }) {
  let styles = {
    height: '40px',
    width: '100px',
    marginTop: '25px',
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    fontSize: '18px',
    cursor: 'not-allowed',
  }
  if (!disabled) {
    styles = { ...styles, cursor: 'pointer', backgroundColor: '#5cd65c' }
  }

  return (
    <button
      style={styles}
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
