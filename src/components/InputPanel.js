import React, { useState } from 'react';

const ZODIAC_SIGNS = [
  { value: 'Áries', emoji: '🐑' },
  { value: 'Touro', emoji: '🐂' },
  { value: 'Gêmeos', emoji: '👯' },
  { value: 'Câncer', emoji: '🦀' },
  { value: 'Leão', emoji: '🦁' },
  { value: 'Virgem', emoji: '👧' },
  { value: 'Libra', emoji: '⚖️' },
  { value: 'Escorpião', emoji: '🦂' },
  { value: 'Sagitário', emoji: '🏹' },
  { value: 'Capricórnio', emoji: '🐐' },
  { value: 'Aquário', emoji: '🌊' },
  { value: 'Peixes', emoji: '🐟' }
];

const RACES = [
  { value: 'branca', label: 'Branca', emoji: '🧑🏻‍🦲' },
  { value: 'preta', label: 'Preta', emoji: '🧑🏿‍🦲' },
  { value: 'parda', label: 'Parda', emoji: '🧑🏽‍🦲' },
  { value: 'amarela', label: 'Amarela', emoji: '👨‍🦲' },
  { value: 'indigena', label: 'Indígena', emoji: '🧑🏼‍🦲' }
];

const InputPanel = ({ filters, onChange, onSubmit }) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleCheckboxGroup = (name, value, isChecked) => {
    const currentValues = filters[name];
    const newValues = isChecked 
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    onChange(name, newValues);
  };

  const getIncomeColor = (value) => {
    const min = 1000;
    const max = 50000;
    const percentage = (value - min) / (max - min);
    const hue = percentage * 120; // 0 is red, 120 is green
    return `hsl(${hue}, 80%, 45%)`;
  };

  const handleChange = (name, value) => {
    if (!hasInteracted) setHasInteracted(true);
    onChange(name, value);
  };

  const handlePanelInteraction = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };

  return (
    <div 
      className="space-y-6" 
      onClick={handlePanelInteraction}
      onKeyDown={handlePanelInteraction}
      onChange={handlePanelInteraction}
    >
      <button
        onClick={onSubmit}
        className={`w-full py-3 px-4 text-white font-medium rounded-lg 
          bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 
          hover:opacity-90 transition-all duration-500
          animate-gradient-x bg-[length:200%_100%]
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          ${isActive ? 'opacity-100' : 'opacity-40'}`}
        style={{
          backgroundSize: '200% 100%',
          animation: 'gradient 2s ease-in-out infinite'
        }}
      >
        Descubra 🔎
      </button>

      <div>
        <div className="space-y-2">
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              className="form-checkbox text-blue-600"
              checked={filters.genders.includes('male')}
              onChange={(e) => {
                const newGenders = e.target.checked
                  ? [...filters.genders, 'male']
                  : filters.genders.filter(g => g !== 'male');
                onChange('genders', newGenders);
              }}
            />
            <span className="ml-2">Homem</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-blue-600"
              checked={filters.genders.includes('female')}
              onChange={(e) => {
                const newGenders = e.target.checked
                  ? [...filters.genders, 'female']
                  : filters.genders.filter(g => g !== 'female');
                onChange('genders', newGenders);
              }}
            />
            <span className="ml-2">Mulher</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Idade
        </label>
        <div className="flex items-center space-x-2">
          <span>De</span>
          <input
            type="number"
            min="18"
            max={filters.age[1]}
            value={filters.age[0]}
            onChange={(e) => handleChange('age', [parseInt(e.target.value), filters.age[1]])}
            className="w-20 border border-gray-300 rounded-md p-1"
          />
          <span>a</span>
          <input
            type="number"
            min={filters.age[0]}
            max="80"
            value={filters.age[1]}
            onChange={(e) => handleChange('age', [filters.age[0], parseInt(e.target.value)])}
            className="w-20 border border-gray-300 rounded-md p-1"
          />
          <span>anos</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Altura
        </label>
        <div className="flex items-center space-x-2">
          <span>De</span>
          <input
            type="number"
            min="140"
            max={filters.height[1]}
            value={filters.height[0]}
            onChange={(e) => handleChange('height', [parseInt(e.target.value), filters.height[1]])}
            className="w-20 border border-gray-300 rounded-md p-1"
          />
          <span>a</span>
          <input
            type="number"
            min={filters.height[0]}
            max="210"
            value={filters.height[1]}
            onChange={(e) => handleChange('height', [filters.height[0], parseInt(e.target.value)])}
            className="w-20 border border-gray-300 rounded-md p-1"
          />
          <span>cm</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Renda Mínima:{' '}
          <span style={{ color: getIncomeColor(filters.minIncome) }}>
            R$ {filters.minIncome.toLocaleString()}
          </span>
        </label>
        <input
          type="range"
          min="1000"
          max="50000"
          step="1000"
          value={filters.minIncome}
          onChange={(e) => handleChange('minIncome', parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Cor de Pele
        </label>
        <div className="grid grid-cols-2 gap-2">
          {RACES.map(({ value, label, emoji }) => (
            <label key={value} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={filters.races.includes(value)}
                onChange={(e) => handleCheckboxGroup('races', value, e.target.checked)}
              />
              <span className="ml-2">{emoji} {label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            checked={filters.excludeMarried}
            onChange={(e) => handleChange('excludeMarried', e.target.checked)}
          />
          <span className="ml-2">Excluir Casados 💑</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            checked={filters.excludeUnemployed}
            onChange={(e) => handleChange('excludeUnemployed', e.target.checked)}
          />
          <span className="ml-2">Excluir Desempregados 💼</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Excluir Signos
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ZODIAC_SIGNS.map(({ value, emoji }) => (
            <label key={value} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={filters.excludeZodiacSigns.includes(value)}
                onChange={(e) => handleCheckboxGroup('excludeZodiacSigns', value, e.target.checked)}
              />
              <span className="ml-2">{emoji} {value}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputPanel; 