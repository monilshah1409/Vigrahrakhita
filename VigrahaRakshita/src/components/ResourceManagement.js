import React, { useContext, useState } from 'react';
import { DisasterContext } from '../context/DisasterContext';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ResourceManagement = () => {
  const context = useContext(DisasterContext);
  const cityData = context?.cityData || {};
  const updateCityData = context?.updateCityData || (() => {});
  
  // Update your resource allocation to use cityData
  const [resources, setResources] = useState([
    { id: 1, name: 'Food Packets', quantity: 1500, category: 'Food', status: 'In Stock', priority: 'High' },
    { id: 2, name: 'Medical Kits', quantity: 300, category: 'Medical', status: 'Low Stock', priority: 'Urgent' },
    { id: 3, name: 'Tents', quantity: 200, category: 'Shelter', status: 'In Stock', priority: 'Medium' },
  ]);

  const [allocations] = useState([
    { calamity: 'Flood Relief', resource: 'Boats', allocated: 50 },
    { calamity: 'Earthquake Zone', resource: 'Tents', allocated: 120 },
    { calamity: 'Cyclone Area', resource: 'Food', allocated: 800 },
  ]);

  const chartData = {
    labels: resources.map(r => r.name),
    datasets: [{
      data: resources.map(r => r.quantity),
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 0,
    }],
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <span className="bg-blue-100 p-3 rounded-lg">📦</span>
        Disaster Resource Allocation System
      </h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl hover:shadow-md transition-shadow">
          <h3 className="text-sm font-semibold text-blue-600 mb-2">Total Resources</h3>
          <p className="text-3xl font-bold text-gray-800">2,000+</p>
          <span className="text-sm text-blue-500">Across 3 categories</span>
        </div>
        
        <div className="bg-green-50 p-6 rounded-xl hover:shadow-md transition-shadow">
          <h3 className="text-sm font-semibold text-green-600 mb-2">Active Calamities</h3>
          <p className="text-3xl font-bold text-gray-800">3 Regions</p>
          <span className="text-sm text-green-500">Flood, Earthquake, Cyclone</span>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-xl hover:shadow-md transition-shadow">
          <h3 className="text-sm font-semibold text-orange-600 mb-2">Immediate Needs</h3>
          <p className="text-3xl font-bold text-gray-800">1.2K+</p>
          <span className="text-sm text-orange-500">Medical supplies priority</span>
        </div>
      </div>

      {/* Visualization Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Resource Distribution
            <span className="ml-2 text-sm text-blue-500">(Live Updates)</span>
          </h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut 
              data={chartData}
              options={{ 
                plugins: { legend: { position: 'bottom' } },
                cutout: '60%'
              }}
            />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Calamity Allocation
            <span className="ml-2 text-sm text-green-500">(Active Operations)</span>
          </h3>
          <div className="space-y-4">
            {allocations.map((allocation, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-800">{allocation.calamity}</h4>
                    <p className="text-sm text-gray-600">{allocation.resource}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {allocation.allocated} units
                  </span>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(allocation.allocated/1000*100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Table */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-6 text-gray-700">
          Inventory Management
          <span className="ml-2 text-sm text-gray-500">(Real-time Tracking)</span>
        </h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Resource</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {resources.map(resource => (
                <tr key={resource.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{resource.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{resource.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{resource.quantity}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                      ${resource.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {resource.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${resource.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 
                       resource.priority === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                      {resource.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResourceManagement;