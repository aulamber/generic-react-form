import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function FieldErrors({ name, fields }, { displayErrorsFromStart }) {
  if (fields[name] === undefined) return <div />

  const styles = {
    color: 'red',
    width: '165px',
    margin: 'auto',
    textAlign: 'left',
  }
  const { errors } = fields[name]

  if (!errors || !Object.keys(errors).length) return <div />

  const errorMap = Object.keys(errors)
    .filter(error => {
      const { displayStatus } = errors[error]

      // case #1: display any error from start
      if (displayErrorsFromStart) { return true }

      // case #2: display compar error as soon as a compared field becomes dirty
      if (displayStatus !== undefined) { return displayStatus }

      // case #3: display simple error as soon as a field becomes dirty
      return !fields[name].pristine
    })

    .map((error, i) => {
      return <p key={i}>{errors[error].message}</p>
    })

  return <div style={styles}>{ errorMap }</div>
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
