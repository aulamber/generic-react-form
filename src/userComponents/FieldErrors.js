import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './style'


function FieldErrors({ name, fieldErrorsToDisplay }) {
  const fieldErrors = fieldErrorsToDisplay[name]

  if (!fieldErrors) return <div />

  const errorMap = Object.keys(fieldErrors).map((error, i) => {
    return <p key={i}>{fieldErrors[error].message}</p>
  })

  return <div style={styles.fieldErrors}>{ errorMap }</div>
}

function mapStateToProps({ formReducer }) {
  return { fieldErrorsToDisplay: formReducer.fieldErrorsToDisplay };
}

FieldErrors.propTypes = { name: PropTypes.string.isRequired };

export default connect(mapStateToProps)(FieldErrors);
