import React, { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [ticker, setTicker] = useState('');
  const [priceData, setPriceData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPriceData(null);
    try {
      const response = await axios.post('http://localhost:8000/price', { ticker });
      setPriceData(response.data);
    } catch (error) {
      console.error('Error fetching stock price:', error);
      setError(error.response?.data?.detail || 'Failed to fetch stock price. Please check the backend server.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Stock Price Simulator</h1>
      <form onSubmit={handleSubmit} className="mb-6 flex space-x-4">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter stock ticker (e.g., GOOG)"
          className="border border-gray-300 p-3 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
          Get Stock Price
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {priceData && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Current Stock Price</h2>
          <p className="text-gray-600 mb-2">Ticker: {priceData.ticker}</p>
          <p className="text-gray-600 mb-2">Price: ${priceData.price.toFixed(2)}</p>
          <p className="text-gray-600">Timestamp: {new Date(priceData.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;