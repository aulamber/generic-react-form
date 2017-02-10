import React, { PropTypes } from 'react';

import style from './style';


function SubmitButton({ disabled, onSubmit }) {
  const styles = (!disabled
    ? style.submitButton.nonDisabled
    : style.submitButton.disabled
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

export default SubmitButton;
