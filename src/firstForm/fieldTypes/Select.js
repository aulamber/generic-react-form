import React from 'react';
import PropTypes from 'prop-types';

import styles from '../style';

function Select({ handleField, hasError, options, value }) {
  const style = (!hasError ? styles.select.regular : styles.select.error);

  const filteredOptions = options.filter(option => option !== value);
  const optionsToDisplay = filteredOptions.map(option => (
    <option key={option} style={{ color: 'black' }} value={option}>{option}</option>
  ));

  return (
    <select onChange={handleField} style={style}>
      <option defaultValue={value}>{value}</option>

      {optionsToDisplay}
    </select>
  );
}

Select.defaultProps = {
  hasError: false,
};

Select.propTypes = {
  handleField: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
};

export default Select;
