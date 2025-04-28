import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DisasterProvider } from './context/DisasterContext';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import EmergencyContact from './components/EmergencyContact';
import AIPrediction from './components/AIPrediction';
import VolunteerRegistration from './components/VolunteerRegistration';
import ResourceManagement from './components/ResourceManagement';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/emergency" element={<EmergencyContact />} />
        <Route path="/ai-prediction" element={<AIPrediction />} />
        <Route path="/volunteer" element={<VolunteerRegistration />} />
        <Route path="/resources" element={<ResourceManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
