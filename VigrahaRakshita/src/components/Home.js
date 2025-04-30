import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative bg-gray-900 min-h-screen flex items-center justify-center text-white">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80"
        alt="Disaster Management"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="relative z-10 max-w-4xl text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fadeInDown">
          VigrahaRakṣhitā
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-fadeInUp">
          भारत की आपदा सुरक्षा प्रहरी - Guardian of India during Disasters
        </p>
        <div className="flex flex-wrap justify-center gap-6 animate-fadeInUp delay-200">
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded shadow-lg transition"
          >
            View Dashboard
          </Link>
          <Link
            to="/volunteer"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded shadow-lg transition"
          >
            Volunteer Now
          </Link>
          <a
            href="https://drive.google.com/uc?export=download&id=1eeLSoKq_fTuR3mcVYC-RbON7PVUiuxC-"
            download="SafetyGuide.pdf"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded shadow-lg transition"
          >
            Download Safety Guide
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
