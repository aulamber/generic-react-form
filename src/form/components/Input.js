import _ from 'lodash'
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';
import {
  updateDisableStatus,
  updateFieldValue,
  updateFieldErrors,
  updateFormErrors,
} from '../stateHandling/index'


class Input extends Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { pristine, name, actions } = this.props
    const { displayErrorsFromStart, fieldChecks, formChecks } = this.context
    const value = e.target.value
    let fields = this.props.fields
    let formErrors = this.props.formErrors

    fields = updateFieldValue(name, value, fields)
    fields = updateFieldErrors(name, value, fields, fieldChecks[name])
    fields = updateFieldErrors(name, value, fields, fieldChecks.comparChecks, true)
    formErrors = updateFormErrors(formErrors, formChecks, fields)
    const disabled = updateDisableStatus(false, displayErrorsFromStart, fields, formErrors)

    if (pristine) { actions.setFormPristine() }
    actions.setFields(fields)
    actions.setFormErrors(formErrors)
    actions.setDisableStatus(disabled)
  }

  render() {
    const { fields, name } = this.props
    const displayErrors = (this.context.displayErrorsFromStart
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
          onChange={this.onChange}
          placeholder='type something...'
        />
      </div>
    )
  }
}

Input.propTypes = {
  pristine: PropTypes.bool,
  displayErrorsFromStart: PropTypes.bool,
  name: PropTypes.string.isRequired,
  fields: PropTypes.shape(),
  formErrors: PropTypes.shape(),
  fieldChecks: PropTypes.shape(),
  formChecks: PropTypes.arrayOf(PropTypes.func.isRequired),
  actions: PropTypes.shape().isRequired,
}

function mapStateToProps({ formReducer }) {
  const { pristine, fields, formErrors } = formReducer;

  return { pristine, fields, formErrors };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);
