import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-blue-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold hover:text-blue-200 transition-colors duration-200">
          VigrahaRakshita
        </Link>
        {/* Mobile menu button - always visible on mobile */}
        <div className="flex md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        
        {/* Desktop menu - only visible on md and up */}
        <ul className="hidden md:flex space-x-6">
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
        
        {/* Mobile menu - always visible on mobile when open */}
        <div className={`md:hidden fixed top-16 left-0 w-full bg-blue-800 shadow-lg transition-all duration-300 ease-in-out z-50 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
          <ul className="flex flex-col space-y-6 p-6">
            <li>
              <Link to="/" onClick={closeMenu} className="text-white hover:text-blue-200 block py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" onClick={closeMenu} className="text-white hover:text-blue-200 block py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/ai-prediction" onClick={closeMenu} className="text-white hover:text-blue-200 block py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                AI Prediction
              </Link>
            </li>
            <li>
              <Link to="/resources" onClick={closeMenu} className="text-white hover:text-blue-200 block py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Resources
              </Link>
            </li>
            <li>
              <Link to="/emergency" onClick={closeMenu} className="text-white hover:text-blue-200 block py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Emergency Contacts
              </Link>
            </li>
            <li>
              <Link to="/volunteer" onClick={closeMenu} className="text-white hover:text-blue-200 block py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Volunteer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;