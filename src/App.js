import React from 'react';
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
      <FirstForm />
    </div>
  );
}

export default App;
