import { fetchPokemonByName } from '@/lib/projectFetch';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

const typeColors = {
  normal: 'bg-gray-300',
  fire: 'bg-red-400',
  water: 'bg-blue-400',
  electric: 'bg-yellow-300',
  grass: 'bg-green-400',
  ice: 'bg-blue-200',
  fighting: 'bg-red-600',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-400',
  bug: 'bg-green-500',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-600',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800 text-white',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-300',
};

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const pokemon = await fetchPokemonByName(params.name);
  
  if (!pokemon) {
    return {
      title: 'Pokemon Not Found',
    };
  }
  
  return {
    title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} | Pokemon Search`,
    description: pokemon.description,
  };
}

export default async function PokemonDetailPage({ params }) {
  const pokemon = await fetchPokemonByName(params.name);
  
  if (!pokemon) {
    return (
      <div className="text-center py-12">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-4">Pokemon Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find any Pokémon with the name "{params.name}".</p>
        <Link 
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <Breadcrumbs />
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Pokemon Image */}
          <div className="md:w-1/3 bg-gray-50 p-6 flex justify-center items-center">
            <div className="relative w-64 h-64">
              {pokemon.image ? (
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Pokemon Details */}
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
              <span className="text-lg font-semibold text-gray-500">#{pokemon.id}</span>
            </div>
            
            {/* Types */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Types</h2>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={`px-3 py-1 rounded-full ${typeColors[type] || 'bg-gray-300'}`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{pokemon.description}</p>
            </div>
            
            {/* Physical Characteristics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Height</h2>
                <p className="text-gray-700">{pokemon.height} m</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Weight</h2>
                <p className="text-gray-700">{pokemon.weight} kg</p>
              </div>
            </div>
            
            {/* Abilities */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Abilities</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability}
                    className="bg-gray-200 px-3 py-1 rounded-full capitalize"
                  >
                    {ability.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-4">Base Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pokemon.stats.map((stat) => (
              <div key={stat.name} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium capitalize">{stat.name.replace('-', ' ')}</span>
                  <span className="text-sm font-semibold">{stat.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${Math.min(100, (stat.value / 255) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <Link 
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors inline-block"
        >
          Back to Search
        </Link>
      </div>
    </div>
  );
}