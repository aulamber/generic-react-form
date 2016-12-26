import React, { PropTypes } from 'react';

function FieldErrors({ name, fields }) {
  const { /*pristine, */errors } = fields[name]

  if (!errors || !errors.length) return <div />

  const errorMap = errors.map((error, i) => <p key={i}>Field error #{i}: {error}</p>)

  return <div>{ errorMap }</div>
}

FieldErrors.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.shape(),
}

export default FieldErrors
