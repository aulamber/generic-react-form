import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function FieldErrors({name, fields }, context) {
  console.log('!!!!! context = ', context);
  const { displayErrorsFromStart } = context
  console.log('nnnnnn displayErrorsFromStart = ', displayErrorsFromStart);
  console.log('nnnnnn name = ', name);
  console.log('nnnnnn fields = ', fields);
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
  displayErrorsFromStart: PropTypes.bool,
  name: PropTypes.string.isRequired,
  fields: PropTypes.shape(),
}

function mapStateToProps({ formReducer }) {
  return { fields: formReducer.fields };
}

export default connect(mapStateToProps)(FieldErrors);
