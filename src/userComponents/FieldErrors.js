import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import getFieldErrorsToDisplay from '../form/utils/fieldErrorsToDisplay'
import styles from './style'


function FieldErrors({ name, fields }, { displayErrorsFromStart }) {
  const errorsToDisplay = getFieldErrorsToDisplay(name, fields, displayErrorsFromStart)

  if (!errorsToDisplay) return <div />

  const errorMap = errorsToDisplay.map((error, i) => {
    return <p key={i}>{error.message}</p>
  })

  return <div style={styles.fieldErrors}>{ errorMap }</div>
}

FieldErrors.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.shape(),
}

FieldErrors.contextTypes = {
  displayErrorsFromStart: PropTypes.bool
}

function mapStateToProps({ formReducer }) {
  return { fields: formReducer.fields };
}

export default connect(mapStateToProps)(FieldErrors);
