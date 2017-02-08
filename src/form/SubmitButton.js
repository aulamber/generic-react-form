import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


function SubmitButton({ disabled, onSubmit, style }) {
  const styles = (!disabled
    ? style.nonDisabled
    : style.disabled
  )

  return (
    <button
      style={styles}
      type='submit'
      disabled={disabled}
      onClick={onSubmit}
    >
      SUBMIT
    </button>
  )
}

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
}

function mapStateToProps({ formReducer }) {
  return { disabled: formReducer.disabled };
}

export default connect(mapStateToProps)(SubmitButton);
