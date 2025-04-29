import React, { useState, useContext } from 'react';
import { FaRobot, FaInfoCircle, FaShieldAlt } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { DisasterContext } from '../context/DisasterContext';

const cityRisks = {
  Chennai: '70% risk of cyclone next 3 days',
  Patna: '55% risk of flood',
  Bhuj: '40% risk of earthquake',
  Mumbai: '65% risk of heavy rainfall next 3 days',
  Delhi: '50% risk of heatwave next 3 days',
  Kolkata: '45% risk of flood next 3 days',
  Bangalore: '60% risk of drought next 3 days',
  Hyderabad: '50% risk of heatwave next 3 days',
};

const riskTrends = {
  Chennai: [60, 65, 70, 68, 72, 70],
  Patna: [40, 45, 50, 52, 54, 55],
  Bhuj: [30, 32, 35, 37, 39, 40],
  Mumbai: [55, 58, 60, 62, 64, 65],
  Delhi: [45, 47, 48, 49, 50, 50],
  Kolkata: [40, 42, 43, 44, 44, 45],
  Bangalore: [50, 55, 58, 60, 62, 60],
  Hyderabad: [45, 48, 50, 52, 53, 50],
};

const recentPredictions = [
  { city: 'Chennai', type: 'Cyclone', risk: '70%', date: '2025-04-29' },
  { city: 'Patna', type: 'Flood', risk: '55%', date: '2025-04-29' },
  { city: 'Bhuj', type: 'Earthquake', risk: '40%', date: '2025-04-29' },
  { city: 'Mumbai', type: 'Heavy Rainfall', risk: '65%', date: '2025-04-29' },
  { city: 'Delhi', type: 'Heatwave', risk: '50%', date: '2025-04-29' },
  { city: 'Kolkata', type: 'Flood', risk: '45%', date: '2025-04-29' },
  { city: 'Bangalore', type: 'Drought', risk: '60%', date: '2025-04-29' },
  { city: 'Hyderabad', type: 'Heatwave', risk: '50%', date: '2025-04-29' },
];

const safetyTips = {
  Cyclone: [
    'Stay indoors and away from windows.',
    'Keep emergency supplies ready.',
    'Follow official evacuation orders.',
  ],
  Flood: [
    'Move to higher ground immediately.',
    'Avoid walking or driving through floodwaters.',
    'Listen to emergency alerts.',
  ],
  Earthquake: [
    'Drop, Cover, and Hold On.',
    'Stay away from windows and heavy objects.',
    'Evacuate only when safe.',
  ],
  'Heavy Rainfall': [
    'Avoid outdoor activities during heavy rain.',
    'Ensure proper drainage around your home.',
    'Stay updated with weather alerts.',
  ],
  Heatwave: [
    'Stay hydrated and avoid direct sunlight.',
    'Wear light and loose clothing.',
    'Check on vulnerable people regularly.',
  ],
  Drought: [
    'Conserve water and avoid wastage.',
    'Use water-efficient appliances.',
    'Stay informed about water supply updates.',
  ],
};

const AIPrediction = () => {
  const context = useContext(DisasterContext);
  const cityData = context?.cityData || {};
  const updateCityData = context?.updateCityData || (() => {});
  
  // Update your predictions to use cityData
  const [selectedCity, setSelectedCity] = useState('');
  const [risk, setRisk] = useState('');
  const [trend, setTrend] = useState([]);
  const [tips, setTips] = useState([]);

  const handleChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setRisk(cityRisks[city] || '');
    setTrend(riskTrends[city] || []);
    if (city === 'Chennai') setTips(safetyTips.Cyclone);
    else if (city === 'Patna') setTips(safetyTips.Flood);
    else if (city === 'Bhuj') setTips(safetyTips.Earthquake);
    else if (city === 'Mumbai') setTips(safetyTips['Heavy Rainfall']);
    else if (city === 'Delhi') setTips(safetyTips.Heatwave);
    else if (city === 'Kolkata') setTips(safetyTips.Flood);
    else if (city === 'Bangalore') setTips(safetyTips.Drought);
    else if (city === 'Hyderabad') setTips(safetyTips.Heatwave);
    else setTips([]);
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Risk Trend (%)',
        data: trend,
        fill: true,
        borderColor: '#007BFF',
        backgroundColor: 'rgba(0,123,255,0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <FaRobot className="text-4xl text-blue-600" />
        <div>
          <h2 className="text-3xl font-extrabold mb-1">🧠 AI-Based Disaster Risk Prediction</h2>
          <p className="text-gray-700">Get real-time AI predictions for disaster risks in major Indian cities. Select a city to view risk analysis, trends, and safety tips.</p>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="city" className="block mb-2 font-semibold text-lg">
          <FaInfoCircle className="inline mr-2 text-blue-500" />
          Select City
        </label>
        <select
          id="city"
          value={selectedCity}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full max-w-xs shadow"
        >
          <option value="">Select a city</option>
          {Object.keys(cityRisks).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {risk && (
        <div className="mb-6 p-4 bg-blue-100 border-l-4 border-blue-500 rounded shadow">
          <p className="text-xl font-semibold text-blue-900">{risk}</p>
        </div>
      )}
      {trend.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-2">Risk Trend (Last 6 Months)</h3>
          <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-2">Recent AI Predictions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-center">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b font-semibold">City</th>
                <th className="py-2 px-4 border-b font-semibold">Disaster Type</th>
                <th className="py-2 px-4 border-b font-semibold">Risk</th>
                <th className="py-2 px-4 border-b font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPredictions.map((pred, idx) => (
                <tr 
                  key={idx} 
                  className="hover:bg-blue-50 cursor-pointer"
                  onClick={() => {
                    setSelectedCity(pred.city);
                    setRisk(cityRisks[pred.city] || '');
                    setTrend(riskTrends[pred.city] || []);
                    setTips(safetyTips[pred.type] || []);
                  }}
                >
                  <td className="py-2 px-4 border-b">{pred.city}</td>
                  <td className="py-2 px-4 border-b">{pred.type}</td>
                  <td className="py-2 px-4 border-b">{pred.risk}</td>
                  <td className="py-2 px-4 border-b">{pred.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {tips.length > 0 && (
        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 rounded shadow">
          <h3 className="text-lg font-bold mb-2 flex items-center">
            <FaShieldAlt className="mr-2 text-green-600" />
            Safety Tips
          </h3>
          <ul className="list-disc pl-6 text-green-900">
            {tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIPrediction;
