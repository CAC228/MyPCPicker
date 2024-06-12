import React, { useState } from 'react';

const PriceAlert: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle setting price alert logic here
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Price Alert</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-700">Send an e-mail alert if the price drops to:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Your email"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Set
        </button>
      </form>
    </div>
  );
};

export default PriceAlert;
