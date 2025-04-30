import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post('http://localhost:8000/recommend', {
          ticker: 'AAPL',
          user_data: {
            user_id: "user123",
            risk_appetite: "moderate",
            investment_horizon: "5 years",
            investment_amount: 10000
          }
        });
        setRecommendations([response.data]);
      } catch (error) {
        setError('Failed to fetch recommendations. Please try again.');
        console.error('Error fetching recommendations:', error);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <nav className="mb-6 flex space-x-4">
        <Link to="/" className="text-blue-600 hover:underline font-semibold">Dashboard</Link>
        <Link to="/portfolio" className="text-blue-600 hover:underline font-semibold">Portfolio</Link>
        <Link to="/recommendations" className="text-blue-600 hover:underline font-semibold">Recommendations</Link>
        <Link to="/leaderboard" className="text-blue-600 hover:underline font-semibold">Leaderboard</Link>
      </nav>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Your Recommendations</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        {recommendations.length === 0 ? (
          <p className="text-gray-600">No recommendations yet.</p>
        ) : (
          recommendations.map((rec, index) => (
            <div key={index} className="border border-gray-200 p-6 mb-4 rounded-lg bg-white">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recommendation</h2>
              <p className="text-gray-600 mb-4">{rec.recommendation}</p>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Explanation</h2>
              <p className="text-gray-600">{rec.explanation}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Recommendations;