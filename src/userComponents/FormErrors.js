import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './style'

function FormErrors({ formErrors, hasFormErrorsToDisplay }) {
  if (!hasFormErrorsToDisplay) return <div />

  const errorMap = Object.keys(formErrors).map((error, i) => {
    return <p key={i}>{formErrors[error]}</p>
  })

  return (
    <div style={styles.formErrors.container}>
      <p style={styles.formErrors.title}>Form errors:</p>
      { errorMap }
    </div>
  )
}

function mapStateToProps({ formReducer }) {
  const { formErrors, hasFormErrorsToDisplay } = formReducer;

  return { formErrors, hasFormErrorsToDisplay };
}

FormErrors.defaultProps = {
  hasFormErrorsToDisplay: false,
  style: {},
};

FormErrors.propTypes = {
  formErrors: PropTypes.shape(),
  hasFormErrorsToDisplay: PropTypes.bool,
};

export default connect(mapStateToProps)(FormErrors);
