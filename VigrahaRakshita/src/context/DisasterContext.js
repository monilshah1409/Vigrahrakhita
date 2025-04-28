import React, { createContext, useState } from 'react';

export const DisasterContext = createContext();

export const DisasterProvider = ({ children }) => {
  const [cityData, setCityData] = useState({
    Chennai: { risk: '70%', type: 'Cyclone', resources: { food: 500, medical: 200, shelter: 100 } },
    Patna: { risk: '55%', type: 'Flood', resources: { food: 700, medical: 150, shelter: 80 } },
    Bhuj: { risk: '40%', type: 'Earthquake', resources: { food: 300, medical: 100, shelter: 120 } }
  });

  const updateCityData = (city, data) => {
    setCityData(prev => ({
      ...prev,
      [city]: { ...prev[city], ...data }
    }));
  };

  return (
    <DisasterContext.Provider value={{ cityData, updateCityData }}>
      {children}
    </DisasterContext.Provider>
  );
};