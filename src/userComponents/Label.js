import React, { PropTypes } from 'react';

function FieldErrors({ label }) {
  const styles = { marginTop: '30px' }
  return <p style={styles} >{ label }</p>
}

FieldErrors.propTypes = {
  label: PropTypes.string.isRequired,
}

export default FieldErrors
