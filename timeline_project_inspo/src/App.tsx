import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TimelinePage } from './pages/TimelinePage';
import { Calendar, Home } from 'lucide-react';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Party Planning Timeline
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Experience the new interactive timeline feature for party planning
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/timeline"
            className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <Calendar size={24} />
            View Timeline Prototype
          </Link>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>Features: Vertical timeline • Event stacking • Interactive details</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-xs text-gray-600">Sample Events</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">4</div>
            <div className="text-xs text-gray-600">Milestones</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-xs text-gray-600">Duration Events</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">5</div>
            <div className="text-xs text-gray-600">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timeline" element={<TimelinePage />} />
      </Routes>
    </Router>
  );
}

export default App;