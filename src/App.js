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
      displayErrorsFromStart: true,
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

  const MySecondForm = createForm(
    {
      formName: "MySecondForm",
      displayErrorsFromStart: true,
      fieldChecks,
      formChecks,
      initialFields: {
        amount1: { value : '1', isRequired: true },
        amount2: { value : '2', isRequired: true },
        amount3: { value: '3', isRequired: true },
        amount4: { value: '4', isRequired: false },
      }
    },
    FormContent,
  )

  return (
    <div className="App" style={styles}>
      <MyFirstForm />
      <MySecondForm />
    </div>
  );
}

export default App;
