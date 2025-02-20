import React from 'react';
import Calculator from './components/Calculator';
import BackgroundAnimation from './components/BackgroundAnimation';
import FAQ from './components/FAQ';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 relative">
      <BackgroundAnimation />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-6xl font-bold text-center mb-12 text-gray-900">
          Qual a chance de encontrar seu par ideal? 💕
        </h1>
        <Calculator />
        <FAQ />
      </div>
    </div>
  );
}

export default App; 