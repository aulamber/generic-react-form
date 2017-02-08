import _ from 'lodash'
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


function Input(props, { displayErrorsFromStart, onFieldChange }) {
  const { fields, name, style } = props

  if (!name || fields[name] === undefined) { return <div /> }

  let inputProps = {
    ...(_.omit(props, ['fields', 'dispatch'])),
    value: fields[name].value,
    onChange: onFieldChange(name),
  }

  if (style) {
    const displayErrors = (displayErrorsFromStart
      ? !!(Object.keys(fields[name].errors).length)
      : !fields[name].pristine && !!(Object.keys(fields[name].errors).length)
    )

    inputProps = {
      ...inputProps,
      style: (displayErrors ? style.selected : style.nonSelected),
    }
  }

  return (
    <input { ...inputProps } />
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.shape(),
}

Input.contextTypes = {
  displayErrorsFromStart: PropTypes.bool,
  onFieldChange: PropTypes.func,
}

function mapStateToProps({ formReducer }) {
  return { fields: formReducer.fields };
}

export default connect(mapStateToProps)(Input);
