import React, { PropTypes } from 'react';

function FieldErrors({ label }) {
  return <p>{ label }</p>
}

FieldErrors.propTypes = {
  label: PropTypes.string.isRequired,
}

export default FieldErrors
