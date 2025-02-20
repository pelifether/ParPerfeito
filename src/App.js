import React from 'react';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  return (
    <div className="app-background">
      <h1 className="page-title">
        Qual a chance de encontrar seu par perfeito? 💕
      </h1>
      <Calculator />
    </div>
  );
}

export default App; 