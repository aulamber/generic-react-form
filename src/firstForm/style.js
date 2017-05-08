const disabledButton = {
  border: '1px solid #bfbfbf',
  borderRadius: '3px',
  cursor: 'not-allowed',
  fontSize: '18px',
  height: '40px',
  marginTop: '25px',
  width: '100px',
};

const abledButton = {
  ...disabledButton,
  backgroundColor: '#5cd65c',
  cursor: 'pointer',
};

const regularField = {
  border: '1px solid #bfbfbf',
  borderRadius: '3px',
  color: '#666666',
  fontSize: '16px',
  height: '30px',
  paddingLeft: '15px',
  paddingRight: '15px',
  width: '160px',
};

const errorField = {
  ...regularField,
  border: '1px solid red',
};

const field = {
  error: errorField,
  regular: regularField,
};

const fieldErrors = {
  color: 'red',
  margin: 'auto',
  textAlign: 'left',
  width: '165px',
};

function form(disabled) {
  return {
    backgroundColor: (disabled ? '#f2f2f2' : '#b3ffb3'),
    borderRadius: '10px',
    padding: '20px 0',
    width: '360px',
  };
}

const formErrors = {
  container: {
    backgroundColor: '#ffaa80',
    borderRadius: '10px',
    color: 'white',
    margin: 'auto',
    marginBottom: '35px',
    padding: '1px',
    width: '320px',
  },
  title: {
    fontWeight: 'bold',
  },
};

const label = {
  marginTop: '30px',
};

function submit(disabled) {
  if (disabled) return disabledButton;

  return abledButton;
}

const top = {
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  marginTop: '60px',
};

export default {
  field,
  fieldErrors,
  form,
  formErrors,
  label,
  submit,
  top,
};