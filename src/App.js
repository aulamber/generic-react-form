import React from 'react';
import logo from './logo.svg';
import './App.css';

import createForm from './form';
import firstForm from './firstForm';

function App() {
  const FirstForm = createForm({
    ComposedComponent: firstForm.ComposedComponent,
    config: firstForm.config,
  });

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>

      <FirstForm />
    </div>
  );
}

export default App;
