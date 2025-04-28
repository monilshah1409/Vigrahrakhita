import React, { useState, useMemo } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const indiaZones = [
  { id: 'gujarat', name: 'Gujarat', type: 'earthquake', color: 'red', lat: 21.1702, lng: 72.8311 },
  { id: 'himachal', name: 'Himachal Pradesh', type: 'earthquake', color: 'red', lat: 31.1048, lng: 77.1734 },
  { id: 'assam', name: 'Assam', type: 'flood', color: 'blue', lat: 26.2006, lng: 92.9376 },
  { id: 'bihar', name: 'Bihar', type: 'flood', color: 'blue', lat: 25.0961, lng: 85.3131 },
  { id: 'odisha', name: 'Odisha', type: 'cyclone', color: 'yellow', lat: 20.9517, lng: 85.0985 },
  { id: 'andhra', name: 'Andhra Pradesh', type: 'cyclone', color: 'yellow', lat: 15.9129, lng: 79.7400 },
];

const initialDisasterDetails = {
  gujarat: 'Earthquake 5.2 Richter Scale detected near Ahmedabad.',
  himachal: 'Earthquake 4.9 Richter Scale detected near Manali.',
  assam: 'Flood warning in Dibrugarh – Brahmaputra rising 3cm/hr.',
  bihar: 'Flood warning in Muzaffarpur – Ganges rising 4cm/hr.',
  odisha: 'Cyclone alert upgraded for Odisha coast.',
  andhra: 'Cyclone alert downgraded for Andhra Pradesh coast.',
};

const generateRandomData = () => ({
  floods: Array.from({ length: 6 }, () => Math.floor(Math.random() * 8)),
  earthquakes: Array.from({ length: 6 }, () => Math.floor(Math.random() * 4)),
  cyclones: Array.from({ length: 6 }, () => Math.floor(Math.random() * 3)),
});

const DisasterLegend = () => {
  return (
    <div className="bg-white p-3 rounded shadow-md mb-4 text-sm">
      <h4 className="font-semibold mb-2">Disaster Types</h4>
      <ul>
        <li className="flex items-center gap-2 mb-1">
          <span className="w-4 h-4 bg-red-700 rounded-full inline-block"></span> Earthquake
        </li>
        <li className="flex items-center gap-2 mb-1">
          <span className="w-4 h-4 bg-blue-700 rounded-full inline-block"></span> Flood
        </li>
        <li className="flex items-center gap-2">
          <span className="w-4 h-4 bg-yellow-600 rounded-full inline-block"></span> Cyclone
        </li>
      </ul>
    </div>
  );
};

import { motion } from 'framer-motion';
import { useContext } from 'react';
import { DisasterContext } from '../context/DisasterContext';

const Dashboard = () => {
  const context = useContext(DisasterContext);
  const cityData = context?.cityData || {};
  
  // Resource data matching ResourceManagement.js
  const [resources] = useState([
    { id: 1, name: 'Food Packets', quantity: 1500, category: 'Food', status: 'In Stock', priority: 'High' },
    { id: 2, name: 'Medical Kits', quantity: 300, category: 'Medical', status: 'Low Stock', priority: 'Urgent' },
    { id: 3, name: 'Tents', quantity: 200, category: 'Shelter', status: 'In Stock', priority: 'Medium' },
  ]);

  const [allocations] = useState([
    { calamity: 'Flood Relief', resource: 'Boats', allocated: 50 },
    { calamity: 'Earthquake Zone', resource: 'Tents', allocated: 120 },
    { calamity: 'Cyclone Area', resource: 'Food', allocated: 800 },
  ]);

  // Calculate total resources from cityData
  const totalResources = useMemo(() => {
    return Object.values(cityData).reduce((sum, city) => {
      return sum + 
        (city.resources?.food || 0) +
        (city.resources?.medical || 0) +
        (city.resources?.shelter || 0);
    }, 0);
  }, [cityData]);

  // Single metrics state declaration
  const [metrics] = useState({
    activeDisasters: 3,
    affectedPeople: 15000,
    deployedResources: totalResources,
    activeVolunteers: 1200
  });



  // Update your charts and data to use cityData
  const [selectedZone, setSelectedZone] = useState(null);
  const [disasterDetails, setDisasterDetails] = useState(initialDisasterDetails);
  const [filters, setFilters] = useState({
    earthquake: true,
    flood: true,
    cyclone: true,
  });
  const [lineData, setLineData] = useState({
    labels: ['July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Floods',
        data: [3, 4, 5, 6, 4, 3],
        borderColor: 'blue',
        backgroundColor: 'rgba(0,0,255,0.3)',
      },
      {
        label: 'Earthquakes',
        data: [2, 2, 3, 3, 2, 2],
        borderColor: 'red',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
      {
        label: 'Cyclones',
        data: [1, 2, 2, 2, 1, 1],
        borderColor: 'yellow',
        backgroundColor: 'rgba(255,255,0,0.3)',
      },
    ],
  });

  const pieChartData = {
    labels: ['Food', 'Medical', 'Shelter', 'Transport'],
    datasets: [
      {
        label: 'Resource Allocation',
        data: [
          totalResources * 0.35, // Food
          totalResources * 0.25, // Medical
          totalResources * 0.20, // Shelter
          totalResources * 0.20  // Transport
        ],
        backgroundColor: ['#4ADE80', '#60A5FA', '#FBBF24', '#F87171']
      }
    ]
  };

  const barChartData = {
    labels: indiaZones.map(zone => zone.name), // Use zone names from indiaZones
    datasets: [
      {
        label: 'Volunteer Distribution',
        data: indiaZones.map(zone => {
          // Calculate volunteers based on zone type and severity
          const baseVolunteers = zone.type === 'earthquake' ? 150 :
                                zone.type === 'flood' ? 200 : 100;
          // Add some variation based on zone ID
          return baseVolunteers + (zone.id.charCodeAt(0) % 50);
        }),
        backgroundColor: indiaZones.map(zone => {
          // Use zone-specific colors
          return zone.type === 'earthquake' ? '#EF4444' :
                         zone.type === 'flood' ? '#3B82F6' : '#F59E0B';
        })
      }
    ]
  };

  const handleZoneClick = (zoneId) => {
    setSelectedZone(zoneId);
  };

  const toggleFilter = (type) => {
    setFilters((prev) => ({ ...prev, [type]: !prev[type] }));
    setSelectedZone(null);
  };

  const refreshData = () => {
    const newData = generateRandomData();
    setLineData((prev) => ({
      ...prev,
      datasets: [
        { ...prev.datasets[0], data: newData.floods },
        { ...prev.datasets[1], data: newData.earthquakes },
        { ...prev.datasets[2], data: newData.cyclones },
      ],
    }));
  };

  const totalVolunteers = useMemo(() => barChartData.datasets[0].data.reduce((a, b) => a + b, 0), [barChartData]);
  const totalDisasters = useMemo(() => lineData.datasets.reduce((sum, ds) => sum + ds.data.reduce((a, b) => a + b, 0), 0), [lineData]);

  // Remove the duplicate metrics declaration below
 
  // Stable resource allocation data
  const resourceAllocation = {
    labels: ['Food', 'Medical', 'Shelter', 'Transport'],
    datasets: [{
      data: [35, 25, 20, 20],
      backgroundColor: ['#4ADE80', '#60A5FA', '#FBBF24', '#F87171']
    }]
  };

  // Stable disaster timeline data
  const disasterTimeline = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Earthquakes',
        data: [2, 1, 3, 2, 1, 4].map(val => val * (totalResources / 1000)),
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)'
      },
      {
        label: 'Floods',
        data: [3, 2, 4, 5, 3, 6].map(val => val * (totalResources / 1000)),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)'
      },
      {
        label: 'Cyclones',
        data: [1, 1, 2, 3, 2, 4].map(val => val * (totalResources / 1000)),
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.2)'
      }
    ]
  };

  // StatCard component
  const StatCard = ({ title, value, icon, color }) => (
    <div className={`p-6 rounded-lg shadow-lg ${color} text-white`}>
      <div className="flex items-center gap-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );

  // Add response time tracking
  const [responseTimes] = useState([
    { region: 'Gujarat', type: 'Earthquake', responseTime: '2h 15m' },
    { region: 'Assam', type: 'Flood', responseTime: '3h 45m' },
    { region: 'Odisha', type: 'Cyclone', responseTime: '1h 50m' }
  ]);

  // Add resource consumption data
  const resourceConsumptionData = {
    labels: ['Food', 'Medical', 'Shelter', 'Transport'],
    datasets: [{
      label: 'Resource Consumption',
      data: [totalResources * 0.4, totalResources * 0.3, totalResources * 0.2, totalResources * 0.1],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }]
  };

  // Add volunteer and NGO engagement data
  const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Volunteers',
        data: [120, 150, 200, 180, 220, 250],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)'
      },
      {
        label: 'NGOs',
        data: [15, 18, 20, 22, 25, 30],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)'
      }
    ]
  };

  // Add new sections to the return statement
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Disaster Management Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive overview of disaster management operations across India</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Active Disasters</p>
            <p className="text-2xl font-bold text-gray-900">6</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Affected People</p>
            <p className="text-2xl font-bold text-gray-900">1,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Deployed Resources</p>
            <p className="text-2xl font-bold text-gray-900">{totalResources}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Active Volunteers</p>
            <p className="text-2xl font-bold text-gray-900">120</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Disaster Zones Map</h2>
            <div className="h-96">
              <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {indiaZones.map(zone => (
                  <Marker
                    key={zone.id}
                    position={[zone.lat, zone.lng]}
                    eventHandlers={{
                      click: () => handleZoneClick(zone.id)
                    }}
                  >
                    <Popup>
                      <div className="space-y-2">
                        <h3 className="font-semibold">{zone.name}</h3>
                        <p className="text-sm text-gray-600">{disasterDetails[zone.id]}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Disaster Trends */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Disaster Trends</h2>
            <div className="h-96">
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Additional Data Visualizations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Resource Allocation</h2>
            <div className="h-64">
              <Pie
                data={pieChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Volunteer Distribution</h2>
            <div className="h-64">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
