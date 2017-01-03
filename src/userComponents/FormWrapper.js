import React, { PropTypes } from 'react';

function FormWrapper({
  styles,
  fieldChecks,
  formChecks,
  displayErrorsFromStart,
  handleSubmit,
  children
}) {
  return (
    <div style={styles}>
      {
        React.Children.map(
          children,
          child => React.cloneElement(child, {
            fieldChecks,
            formChecks,
            displayErrorsFromStart,
            handleSubmit: handleSubmit,
          })
        )
      }
    </div>
  )
}

FormWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default FormWrapper
