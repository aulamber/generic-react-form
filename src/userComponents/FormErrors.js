import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import hasFormErrorsToDisplay from '../form/utils/hasFormErrorsToDisplay'
import styles from './style'

function FormErrors({ pristine, formErrors }, { displayErrorsFromStart }) {
  const hasErrorToDisplay = hasFormErrorsToDisplay(formErrors, displayErrorsFromStart, pristine)

  if (!hasErrorToDisplay) return <div />

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

FormErrors.defaultProps = {
  style: {},
}

FormErrors.propTypes = {
  pristine: PropTypes.bool,
  formErrors: PropTypes.shape(),
}

FormErrors.contextTypes = {
  displayErrorsFromStart: PropTypes.bool
}

function mapStateToProps({ formReducer }) {
  const { pristine, formErrors } = formReducer

  return { pristine, formErrors };
}

export default connect(mapStateToProps)(FormErrors);
