import React, { useState, useMemo } from 'react';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';
import ChartJS from 'chart.js/auto';

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

// Removed manual ChartJS.register calls as chart.js/auto handles registration

const indiaZones = [
  { id: 'uttarakhand', name: 'Uttarakhand', type: 'earthquake', color: 'red', lat: 30.0668, lng: 79.0193 },
  { id: 'westbengal', name: 'West Bengal', type: 'flood', color: 'blue', lat: 22.9868, lng: 87.8550 },
  { id: 'jharkhand', name: 'Jharkhand', type: 'flood', color: 'blue', lat: 23.6102, lng: 85.2799 },
  { id: 'tamilnadu', name: 'Tamil Nadu', type: 'cyclone', color: 'yellow', lat: 11.1271, lng: 78.6569 },
  { id: 'kerala', name: 'Kerala', type: 'cyclone', color: 'yellow', lat: 10.8505, lng: 76.2711 },
  { id: 'pakistan_muzaffarabad', name: 'Muzaffarabad', type: 'flood', color: 'blue', lat: 34.3748, lng: 73.4722 },
  { id: 'pakistan_rawalakot', name: 'Rawalakot', type: 'drought', color: 'orange', lat: 33.8581, lng: 73.7603 },
];

const initialDisasterDetails = {
  uttarakhand: 'Earthquake 5.0 Richter Scale detected near Dehradun.',
  westbengal: 'Flood warning in Kolkata – Hooghly river rising rapidly.',
  jharkhand: 'Flood warning in Ranchi – Heavy rainfall expected.',
  tamilnadu: 'Cyclone alert upgraded for Tamil Nadu coast.',
  kerala: 'Cyclone alert downgraded for Kerala coast.',
  pakistan_muzaffarabad: 'Flood warning in Muzaffarabad – River Jhelum rising rapidly.',
  pakistan_rawalakot: 'Drought conditions worsening in Rawalakot area.',
};

const generateRandomData = () => ({
  floods: Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)),
  earthquakes: Array.from({ length: 6 }, () => Math.floor(Math.random() * 5)),
  cyclones: Array.from({ length: 6 }, () => Math.floor(Math.random() * 4)),
  droughts: Array.from({ length: 6 }, () => Math.floor(Math.random() * 3)),
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
        <li className="flex items-center gap-2 mb-1">
          <span className="w-4 h-4 bg-yellow-600 rounded-full inline-block"></span> Cyclone
        </li>
        <li className="flex items-center gap-2">
          <span className="w-4 h-4 bg-orange-600 rounded-full inline-block"></span> Drought
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
  const cityData = context?.cityData || {
    // Default city data structure
    uttarakhand: { resources: { food: 500, medical: 300, shelter: 200 } },
    westbengal: { resources: { food: 700, medical: 400, shelter: 300 } },
    // ... add other cities with default values
  };
  
  // Calculate total resources from cityData
  const totalResources = useMemo(() => {
    return Object.values(cityData).reduce((sum, city) => {
      return sum + 
        (city.resources?.food || 0) +
        (city.resources?.medical || 0) +
        (city.resources?.shelter || 0);
    }, 0);
  }, [cityData]);

  // Update metrics to use calculated totalResources
  const [metrics] = useState({
    activeDisasters: 7,
    affectedPeople: 25000,
    deployedResources: totalResources,
    activeVolunteers: 2500
  });

  // Updated resource data with more variety and quantities
  const [resources] = useState([
    { id: 1, name: 'Food Packets', quantity: 2000, category: 'Food', status: 'In Stock', priority: 'High' },
    { id: 2, name: 'Medical Kits', quantity: 500, category: 'Medical', status: 'In Stock', priority: 'High' },
    { id: 3, name: 'Tents', quantity: 350, category: 'Shelter', status: 'Low Stock', priority: 'Urgent' },
    { id: 4, name: 'Water Bottles', quantity: 1000, category: 'Food', status: 'In Stock', priority: 'Medium' },
  ]);

  // Resource chart data for Doughnut chart
  const resourceChartData = {
    labels: ['Food', 'Medical', 'Shelter', 'Water'],
    datasets: [{
      data: [
        resources.filter(r => r.category === 'Food').reduce((sum, r) => sum + r.quantity, 0),
        resources.find(r => r.category === 'Medical')?.quantity || 0,
        resources.find(r => r.category === 'Shelter')?.quantity || 0,
        resources.find(r => r.name === 'Water Bottles')?.quantity || 0,
      ],
      backgroundColor: ['#4ADE80', '#60A5FA', '#FBBF24', '#3B82F6']
    }]
  };

  const [allocations] = useState([
    { calamity: 'Flood Relief', resource: 'Boats', allocated: 70 },
    { calamity: 'Earthquake Zone', resource: 'Tents', allocated: 150 },
    { calamity: 'Cyclone Area', resource: 'Food', allocated: 900 },
    { calamity: 'Heatwave Area', resource: 'Water Bottles', allocated: 400 },
  ]);



  // Update your charts and data to use cityData
  const [selectedZone, setSelectedZone] = useState(null);
  const [disasterDetails, setDisasterDetails] = useState(initialDisasterDetails);
  const [filters, setFilters] = useState({
    earthquake: true,
    flood: true,
    cyclone: true,
    drought: true,
  });
  const [lineData, setLineData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Floods',
        data: [4, 5, 6, 7, 5, 4],
        borderColor: 'blue',
        backgroundColor: 'rgba(0,0,255,0.3)',
      },
      {
        label: 'Earthquakes',
        data: [3, 3, 4, 4, 3, 3],
        borderColor: 'red',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
      {
        label: 'Cyclones',
        data: [2, 3, 3, 3, 2, 2],
        borderColor: 'yellow',
        backgroundColor: 'rgba(255,255,0,0.3)',
      },
      {
        label: 'Droughts',
        data: [1, 1, 2, 2, 1, 1],
        borderColor: 'orange',
        backgroundColor: 'rgba(255,165,0,0.3)',
      },
    ],
  });

  const pieChartData = {
    labels: ['Food', 'Medical', 'Shelter', 'Transport'],
    datasets: [
      {
        label: 'Resource Allocation',
        data: [
          totalResources * 0.30, // Food
          totalResources * 0.30, // Medical
          totalResources * 0.25, // Shelter
          totalResources * 0.15  // Transport
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
          const baseVolunteers = zone.type === 'earthquake' ? 180 :
                                zone.type === 'flood' ? 220 : 130;
          // Add some variation based on zone ID
          return baseVolunteers + (zone.id.charCodeAt(0) % 40);
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
        { ...prev.datasets[3], data: newData.droughts },
      ],
    }));
  };

  const totalVolunteers = useMemo(() => barChartData.datasets[0].data.reduce((a, b) => a + b, 0), [barChartData]);
  const totalDisasters = useMemo(() => lineData.datasets.reduce((sum, ds) => sum + ds.data.reduce((a, b) => a + b, 0), 0), [lineData]);

  // Stable resource allocation data
  const resourceAllocation = {
    labels: ['Food', 'Medical', 'Shelter', 'Transport'],
    datasets: [{
      data: [30, 30, 25, 15],
      backgroundColor: ['#4ADE80', '#60A5FA', '#FBBF24', '#F87171']
    }]
  };

  // Stable disaster timeline data
  const disasterTimeline = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Earthquakes',
        data: [3, 2, 4, 3, 2, 5].map(val => val * (totalResources / 1000)),
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)'
      },
      {
        label: 'Floods',
        data: [4, 3, 5, 6, 4, 7].map(val => val * (totalResources / 1000)),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)'
      },
      {
        label: 'Cyclones',
        data: [2, 2, 3, 4, 3, 3].map(val => val * (totalResources / 1000)),
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.2)'
      },
      {
        label: 'Droughts',
        data: [1, 1, 2, 2, 1, 1].map(val => val * (totalResources / 1000)),
        borderColor: '#FFA500',
        backgroundColor: 'rgba(255, 165, 0, 0.2)'
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
    { region: 'Uttarakhand', type: 'Earthquake', responseTime: '2h 10m' },
    { region: 'West Bengal', type: 'Flood', responseTime: '3h 30m' },
    { region: 'Tamil Nadu', type: 'Cyclone', responseTime: '1h 45m' },
    { region: 'Muzaffarabad', type: 'Flood', responseTime: '2h 50m' },
    { region: 'Rawalakot', type: 'Drought', responseTime: '3h 10m' },
  ]);

  // Add resource consumption data
  const resourceConsumptionData = {
    labels: ['Food', 'Medical', 'Shelter', 'Transport'],
    datasets: [{
      label: 'Resource Consumption',
      data: [totalResources * 0.35, totalResources * 0.25, totalResources * 0.25, totalResources * 0.15],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }]
  };

  // Add volunteer and NGO engagement data
  const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Volunteers',
        data: [130, 160, 210, 190, 230, 270],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)'
      },
      {
        label: 'NGOs',
        data: [18, 20, 22, 24, 27, 32],
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
            <p className="text-2xl font-bold text-gray-900">{metrics.activeDisasters}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Affected People</p>
            <p className="text-2xl font-bold text-gray-900">{metrics.affectedPeople.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Deployed Resources</p>
            <p className="text-2xl font-bold text-gray-900">{metrics.deployedResources.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Active Volunteers</p>
            <p className="text-2xl font-bold text-gray-900">{metrics.activeVolunteers}</p>
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
              <Doughnut
                data={resourceChartData}
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
