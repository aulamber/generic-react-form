import _ from 'lodash'
import React, { PropTypes } from 'react';


function Input(props, context) {
  const { handleChange, name, style } = props;
  const { displayErrorsFromStart, fields, onFieldChange } = context;

  if (!name || fields[name] === undefined) { return <div /> };

  let inputProps = {
    ...(_.omit(props, ['handleChange'])),
    value: fields[name].value,
    onChange: onFieldChange(handleChange)(name),
  };

  if (style) {
    const displayErrors = (displayErrorsFromStart
      ? !!(Object.keys(fields[name].errors).length)
      : !fields[name].pristine && !!(Object.keys(fields[name].errors).length)
    );

    inputProps = {
      ...inputProps,
      style: (displayErrors ? style.selected : style.nonSelected),
    };
  }

  return <input { ...inputProps } />;
}

Input.propTypes = {
  handleChange: PropTypes.func, /* Prop handleChange allows user to do stuff
                                 when event triggered; */
  name: PropTypes.string.isRequired,
  style: PropTypes.shape().isRequired,
};

Input.contextTypes = {
  displayErrorsFromStart: PropTypes.bool,
  fields: PropTypes.shape(),
  onFieldChange: PropTypes.func.isRequired,
};

export default Input;
