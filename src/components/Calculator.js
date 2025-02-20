import React, { useState } from 'react';
import InputPanel from './InputPanel';
import ResultsPanel from './ResultsPanel';
import AdBanner from './AdBanner';
import { calculateMatches } from '../services/calculator';
import { DEMOGRAPHICS } from '../data/demographics';

const Calculator = () => {
  const [showResults, setShowResults] = useState(false);
  const [filters, setFilters] = useState({
    genders: [], // array for multiple selection
    age: [26, 36],
    height: [160, 180],
    minIncome: 1000,
    races: [], // array for multiple selection
    excludeMarried: false,
    excludeUnemployed: false,
    excludeZodiacSigns: [] // array for multiple selection
  });

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handlePresetClick = (presetName) => {
    if (presetName === 'caua') {
      setFilters({
        genders: ['male'],
        age: [35, 45],
        height: [180, 200],
        minIncome: 30000,
        races: ['branca'],
        excludeMarried: true,
        excludeUnemployed: true,
        excludeZodiacSigns: []
      });
    } else if (presetName === 'dani') {
      setFilters({
        genders: ['female'],
        age: [40, 55],
        height: [150, 170],
        minIncome: 5000,
        races: ['amarela'],
        excludeMarried: true,
        excludeUnemployed: false,
        excludeZodiacSigns: []
      });
    } else if (presetName === 'india') {
      setFilters({
        genders: ['female'],
        age: [65, 100],
        height: [150, 170],
        minIncome: 1000,
        races: ['indigena'],
        excludeMarried: true,
        excludeUnemployed: false,
        excludeZodiacSigns: ['virgem', 'cancer', 'gemeos', 'touro', 'aries', 'peixes', 'aquario', 'capricornio', 'sagitario', 'escorpiao', 'libra']
      });
    } else if (presetName === 'random') {
      // Random selection of attributes
      const randomGender = Math.random() < 0.5 ? ['male'] : ['female'];
      const randomAgeMin = Math.floor(Math.random() * 40) + 18;
      const randomAgeMax = randomAgeMin + Math.floor(Math.random() * 20) + 5;
      const randomHeightMin = Math.floor(Math.random() * 30) + 150;
      const randomHeightMax = randomHeightMin + Math.floor(Math.random() * 20) + 5;
      const races = ['branca', 'preta', 'parda', 'amarela', 'indigena'];
      const randomRace = [races[Math.floor(Math.random() * races.length)]];
      
      setFilters({
        genders: randomGender,
        age: [randomAgeMin, randomAgeMax],
        height: [randomHeightMin, randomHeightMax],
        minIncome: Math.floor(Math.random() * 29000) + 1000,
        races: randomRace,
        excludeMarried: Math.random() < 0.5,
        excludeUnemployed: Math.random() < 0.5,
        excludeZodiacSigns: []
      });
    }
    setShowResults(true);
  };

  const results = calculateMatches(filters);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-6 flex-col md:flex-row relative z-10">
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow">
          <InputPanel 
            filters={filters} 
            onChange={handleFilterChange}
            onSubmit={() => setShowResults(true)}
          />
        </div>
        
        {/* Mobile Ad Banner */}
        <div className="md:hidden w-full">
          <AdBanner 
            slot="1234567890"  // Replace with your actual ad slot ID
            format="fluid"
            className="my-4"
          />
        </div>
        
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow">
          <ResultsPanel 
            results={results} 
            showResults={showResults}
            onPresetClick={handlePresetClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator; 