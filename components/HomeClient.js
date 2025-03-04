'use client';

import { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';
import PokemonList from '@/components/PokemonList';

export default function HomeClient({ initialPokemon, initialTypes }) {
  const [pokemon, setPokemon] = useState(initialPokemon || []);
  const [filteredPokemon, setFilteredPokemon] = useState(initialPokemon || []);
  const [types, setTypes] = useState(initialTypes || []);
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    filterPokemon();
  }, [searchTerm, selectedType, pokemon]);

  const filterPokemon = () => {
    let filtered = [...pokemon];
    
    if (selectedType) {
      filtered = filtered.filter(p => 
        p.types.includes(selectedType)
      );
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term)
      );
    }
    
    setFilteredPokemon(filtered);
  };

  const handleTypeChange = async (type) => {
    setIsLoading(true);
    setSelectedType(type);
    
    if (type) {
      try {
        const response = await fetch(`/api/pokemon?type=${type}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching Pokemon by type:', error);
      }
    } else {
      try {
        const response = await fetch('/api/pokemon');
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching all Pokemon:', error);
      }
    }
    
    setIsLoading(false);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };
  
  return (
    <>
      <SearchForm 
        types={types}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        onSearchChange={handleSearchChange}
      />
      <PokemonList pokemon={filteredPokemon} isLoading={isLoading} />
    </>
  );
}