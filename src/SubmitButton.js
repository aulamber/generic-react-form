import React, { Component, PropTypes } from 'react';

function getValues(fields) {
  let values = {}

  Object.keys(fields).forEach(field => {
    values = { ...values, [field]: fields[field].value }
  })

  return values
}

class SubmitButton extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    const { displayErrorsFromStart, fields, onSubmit } = this.props

    if (displayErrorsFromStart) {
      onSubmit(getValues(fields))
    }
    e.preventDefault()
  }

  render() {
    const { disabled } = this.props

    return (
      <button type='submit' disabled={disabled} onClick={this.handleSubmit}>
        SUBMIT
      </button>
    )
  }
}

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  displayErrorsFromStart: PropTypes.bool,
  fields: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
}

export default SubmitButton
