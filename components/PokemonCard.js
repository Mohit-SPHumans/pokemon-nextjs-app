import Link from 'next/link';
import Image from 'next/image';

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

export default function PokemonCard({ pokemon }) {
  return (
    <Link 
      href={`/pokemon/${pokemon.name}`}
      className="block transform transition duration-300 hover:scale-105"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
        <div className="p-4 flex flex-col items-center">
          {pokemon.image ? (
            <div className="relative w-32 h-32 mb-2">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          
          <h2 className="text-lg font-semibold capitalize mb-2">
            {pokemon.name}
          </h2>
          
          <div className="flex flex-wrap gap-1 justify-center">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`text-xs px-2 py-1 rounded-full ${typeColors[type] || 'bg-gray-300'}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}