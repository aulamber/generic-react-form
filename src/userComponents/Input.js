import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function Input({ fields, name }, { displayErrorsFromStart, onFieldChange }) {
  if (!name || fields[name] === undefined) { return <div /> }

  const displayErrors = (displayErrorsFromStart
    ? !!(Object.keys(fields[name].errors).length)
    : !fields[name].pristine && !!(Object.keys(fields[name].errors).length)
  )
  let styles = {
    border: '1px solid #bfbfbf',
    height: '30px',
    width: '160px',
    paddingLeft: '15px',
    paddingRight: '15px',
    color: '#666666',
    fontSize: '16px',
    borderRadius: '3px',
  }

  if (displayErrors) { styles = { ...styles, border: '1px solid red' } }

  return (
    <div>
      <input
        style={styles}
        value={fields[name].value}
        onChange={onFieldChange(name)}
        placeholder='type something...'
      />
    </div>
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
