import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-blue-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">VigrahaRakshita</div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-blue-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="text-white hover:text-blue-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/ai-prediction" className="text-white hover:text-blue-200">
              AI Prediction
            </Link>
          </li>
          <li>
            <Link to="/resources" className="text-white hover:text-blue-200">
              Resources
            </Link>
          </li>
          <li>
            <Link to="/emergency" className="text-white hover:text-blue-200">
              Emergency Contacts
            </Link>
          </li>
          
          <li>
            <Link to="/volunteer" className="text-white hover:text-blue-200">
              Volunteer
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;