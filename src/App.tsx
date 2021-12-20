import React from "react";
import "./App.css";
import Results from './components/results';
import InputPanel from './components/inputPanel';
import TotalCounter from './components/totalCounter';

function App() {
  return (
    <div className="App">
      <main className="App-container">
        <TotalCounter />
        <Results />
        <InputPanel />
      </main>
    </div>
  );
}

export default App;
