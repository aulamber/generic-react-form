function form(disabled) {
  return {
    width: '360px',
    padding: '20px 0',
    backgroundColor: (disabled ? '#f2f2f2' : '#b3ffb3'),
    borderRadius: '10px',
  }
}

const label = {
  marginTop: '30px'
}

const nonSelectedInput = {
  border: '1px solid #bfbfbf',
  height: '30px',
  width: '160px',
  paddingLeft: '15px',
  paddingRight: '15px',
  color: '#666666',
  fontSize: '16px',
  borderRadius: '3px',
}

const selectedInput = {
  ...nonSelectedInput,
  border: '1px solid red',
}

const input = {
  nonSelected: nonSelectedInput,
  selected: selectedInput,
}

const fieldErrors = {
  color: 'red',
  width: '165px',
  margin: 'auto',
  textAlign: 'left',
}

const formErrors = {
  container: {
    margin: 'auto',
    width: '320px',
    color: 'white',
    backgroundColor: '#ffaa80',
    borderRadius: '10px',
    padding: '1px',
    marginBottom: '35px',
  },
  title: {
    fontWeight: 'bold',
  },
}

const disabledSubmitButton = {
  height: '40px',
  width: '100px',
  marginTop: '25px',
  border: '1px solid #bfbfbf',
  borderRadius: '3px',
  fontSize: '18px',
  cursor: 'not-allowed',
}

const nonDisabledSubmitButton = {
  ...disabledSubmitButton,
  cursor: 'pointer',
  backgroundColor: '#5cd65c',
}

const submitButton = {
  nonDisabled: nonDisabledSubmitButton,
  disabled: disabledSubmitButton,
}

export default {
  form,
  label,
  input,
  fieldErrors,
  formErrors,
  submitButton,
}
