import _ from 'lodash'
import React, { PropTypes } from 'react';


function Input(props) {
  const {
    displayErrorsFromStart,
    fields,
    handleChange,
    name,
    onFieldChange,
    style,
  } = props;

  if (!name || fields[name] === undefined) { return <div /> };

  let inputProps = {
    ...(_.omit(props, ['displayErrorsFromStart', 'fields', 'handleChange', 'onFieldChange'])),
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

export default Input;
