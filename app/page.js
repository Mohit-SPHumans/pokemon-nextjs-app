import { fetchAllPokemon, fetchPokemonTypes } from '@/lib/projectFetch';
import HomeClient from '@/components/HomeClient';

// This is a Server Component
export default async function Home() {
  // Fetch initial data on the server
  const initialPokemon = await fetchAllPokemon(50);
  const pokemonTypes = await fetchPokemonTypes();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Pokémon Search</h1>
      <HomeClient initialPokemon={initialPokemon} initialTypes={pokemonTypes} />
    </div>
  );
}