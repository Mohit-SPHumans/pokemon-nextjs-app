import PokemonCard from './PokemonCard';

export default function PokemonList({ pokemon, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!pokemon || pokemon.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No Pokémon found. Try a different search.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {pokemon.map((poke) => (
        <PokemonCard key={poke.id} pokemon={poke} />
      ))}
    </div>
  );
}