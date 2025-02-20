import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUserLocation } from '../services/location';

const PresetCard = ({ image, title, subtitle, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 w-full group"
  >
    <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          console.error('Image failed to load:', image);
          e.target.style.display = 'none';
        }}
      />
    </div>
    <div className="ml-4 text-left flex-1">
      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors duration-200">
        {subtitle}
      </p>
    </div>
    <span className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
      →
    </span>
  </button>
);

const InitialState = ({ onPresetClick }) => (
  <div className="space-y-6">
    <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
      <p className="text-gray-600">
        Defina as características do seu par ideal e clique em Descubra
      </p>
    </div>
    
    <div className="text-center text-gray-500">OU</div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PresetCard
        image="/images/caua.jpg"
        title="Quero um galã de novela moreno e alto"
        subtitle="Branco, acima de 1.80, rico"
        onClick={() => onPresetClick('caua')}
      />
      <PresetCard
        image="/images/dani.jpg"
        title="Busco uma mulher oriental mais velha"
        subtitle="Mulher, amarela, 40+"
        onClick={() => onPresetClick('dani')}
      />
      <PresetCard
        image="/images/india.jpg"
        title="Procuro uma índia idosa leonina"
        subtitle="Indígena, 65+, leão"
        onClick={() => onPresetClick('india')}
      />
      <PresetCard
        image="/images/avatar.jpg"
        title="Sugerir perfil - vai que o universo dá um sinal"
        subtitle="Atributos selecionados pelo Cosmos"
        onClick={() => onPresetClick('random')}
      />
    </div>
  </div>
);

const HeartAnimation = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [1, 1.5, 1, 1.5, 1],
      opacity: [0, 1, 1, 1, 0]
    }}
    transition={{
      duration: 2,
      times: [0, 0.25, 0.5, 0.75, 1],
      ease: "easeInOut"
    }}
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl pointer-events-none"
  >
    💕
  </motion.div>
);

const formatPercentage = (percentage) => {
  if (percentage >= 0.01) {
    return percentage.toFixed(2);
  }
  // For very small numbers, use as many decimals as needed until we get a non-zero
  let decimals = 3;
  while (percentage.toFixed(decimals) === '0.000' && decimals < 8) {
    decimals++;
  }
  return percentage.toFixed(decimals);
};

const CityResults = ({ percentage, cityData }) => {
    console.log('CityResults props:', { percentage, cityData });  // Debug log
    
    if (!cityData?.population) {
        console.log('No population data available');  // Debug log
        return null;
    }

    const cityMatchCount = Math.round((cityData.population * percentage) / 100);
    
    return (
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <p className="text-gray-600">
                Na sua cidade, {cityData.city}-{cityData.state}, existem aprox.{' '}
                <span className="font-semibold">{cityMatchCount.toLocaleString()}</span> pessoas 
                que podem ser seu par ideal 📍
            </p>
        </div>
    );
};

const ResultsPanel = ({ results, showResults, onPresetClick }) => {
    const [cityData, setCityData] = useState(null);

    useEffect(() => {
        if (showResults && results) {
            console.log('Fetching location data...');  // Debug log
            getUserLocation().then(location => {
                console.log('Location data received:', location);  // Debug log
                if (location) {
                    setCityData(location);
                }
            });
        }
    }, [showResults, results]);

  // Always show at least one person if there's any chance at all
  const filledCount = results.percentage > 0 
    ? Math.max(1, Math.round((results.percentage * 100) / 100))
    : 0;
  const icons = Array.from({ length: 100 }, (_, i) => i < filledCount);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {showResults ? (
          <>
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="space-y-4"
            >
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-5xl font-bold text-blue-600">
                  {formatPercentage(results.percentage)}%
                </p>
                <p className="text-gray-600">
                  da população brasileira corresponde aos seus critérios
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  Você tem {results.matchCount.toLocaleString()} chances de encontrar 
                  seu par perfeito entre {results.totalCount.toLocaleString()} brasileiros 🇧🇷
                </p>
              </div>

              <div className="grid grid-cols-10 gap-1 max-w-[400px]">
                {icons.map((isMatched, index) => (
                  <div 
                    key={index}
                    className={isMatched ? 'text-lg text-center text-blue-600' : 'text-lg text-center text-blue-600/40'}
                  >
                    👤
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-gray-500">
                Fonte:{' '}
                <a 
                    href="https://www.ibge.gov.br/estatisticas/sociais/populacao/9171-pesquisa-nacional-por-amostra-de-domicilios-continua-mensal.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-gray-700"
                >
                    IBGE - Pesquisa Nacional por Amostra de Domicílios Contínua (PNAD) 2023
                </a>
              </p>
            </motion.div>
            <HeartAnimation />
          </>
        ) : (
          <motion.div
            key="initial"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <InitialState onPresetClick={onPresetClick} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultsPanel;