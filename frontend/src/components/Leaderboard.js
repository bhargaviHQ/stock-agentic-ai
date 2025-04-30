import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:8000/leaderboard');
        setLeaderboard(response.data);
      } catch (error) {
        setError('Failed to fetch leaderboard. Please try again.');
        console.error('Error fetching leaderboard:', error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <nav className="mb-6 flex space-x-4">
        <Link to="/" className="text-blue-600 hover:underline font-semibold">Dashboard</Link>
        <Link to="/portfolio" className="text-blue-600 hover:underline font-semibold">Portfolio</Link>
        <Link to="/recommendations" className="text-blue-600 hover:underline font-semibold">Recommendations</Link>
        <Link to="/leaderboard" className="text-blue-600 hover:underline font-semibold">Leaderboard</Link>
      </nav>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Leaderboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        {leaderboard.length === 0 ? (
          <p className="text-gray-600">No leaderboard entries yet.</p>
        ) : (
          <ul className="space-y-4">
            {leaderboard.map((entry, index) => (
              <li key={index} className="border border-gray-200 p-4 rounded-lg bg-white">
                <span className="font-semibold text-gray-700">User: {entry.user_id}</span> - 
                <span className="text-gray-600"> Score: {entry.score}</span> - 
                <span className="text-gray-500 text-sm"> Updated: {new Date(entry.last_updated).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;