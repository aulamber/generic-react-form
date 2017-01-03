import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

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

function mapStateToProps({ formReducer }) {
  return { disabled: formReducer.disabled };
}

export default connect(mapStateToProps)(SubmitButton);
