import React, { PropTypes } from 'react';

import styles from './style';


function FieldErrors({ fieldErrors }) {
  if (!fieldErrors) return <div />

  const errorMap = Object.keys(fieldErrors).map((error, i) => {
    return <p key={i}>{fieldErrors[error].message}</p>
  })

  return <div style={styles.fieldErrors}>{ errorMap }</div>
}

FieldErrors.propTypes = {
  fieldErrors: PropTypes.shape(),
};

export default FieldErrors;
