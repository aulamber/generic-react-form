import React from 'react';

import { fieldChecks, formChecks } from './checks/selection'

import createForm from './form/createForm'
import FormContent from './userComponents/FormContent'

import './App.css';

const styles = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '60px'
}

function App() {
  const MyFirstForm = createForm(
    {
      formName: "MyFirstForm",
      displayErrorsFromStart: false,
      fieldChecks,
      formChecks,
      initialFields: {
        amount1: { value : '2', isRequired: true },
        amount2: { value : '2', isRequired: true },
        amount3: { value: '1', isRequired: true },
        amount4: { value: '4', isRequired: false },
      }
    },
    FormContent,
  )

  return (
    <div className="App" style={styles}>
      <MyFirstForm />
    </div>
  );
}

export default App;
