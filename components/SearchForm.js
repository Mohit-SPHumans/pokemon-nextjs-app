'use client';

import { useState } from 'react';

export default function SearchForm({ types, onTypeChange, onSearchChange, selectedType }) {
  const [searchInput, setSearchInput] = useState('');
  
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearchChange(value);
  };
  
  const handleTypeSelect = (e) => {
    onTypeChange(e.target.value);
  };
  
  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <form className="space-y-4 md:space-y-0 md:flex md:space-x-4">
        <div className="flex-1">
          <label htmlFor="pokemonType" className="block text-sm font-medium text-gray-700 mb-2">
            Pokémon Type
          </label>
          <select
            id="pokemonType"
            value={selectedType}
            onChange={handleTypeSelect}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label htmlFor="pokemonSearch" className="block text-sm font-medium text-gray-700 mb-2">
            Search Pokémon
          </label>
          <input
            type="text"
            id="pokemonSearch"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Enter Pokémon name..."
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </form>
    </div>
  );
}