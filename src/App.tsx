import React from "react";
import "./App.css";
import Results from './components/results';
import InputPanel from './components/inputPanel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="responsive-width">Total results: 03</h2>

        <Results />

        <InputPanel />
      </header>
    </div>
  );
}

export default App;
