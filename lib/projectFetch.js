
  export async function fetchPokemonTypes() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      const data = await response.json();
      return data.results
        .filter(type => !['unknown', 'shadow'].includes(type.name))
        .map(type => ({
          name: type.name,
          url: type.url
        }));
    } catch (error) {
      console.error('Error fetching Pokemon types:', error);
      return [];
    }
  }
  
  export async function fetchPokemonByType(type) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      
      const pokemonList = data.pokemon.map(p => p.pokemon);
      return await fetchPokemonDetails(pokemonList.slice(0, 20));
    } catch (error) {
      console.error(`Error fetching Pokemon of type ${type}:`, error);
      return [];
    }
  }
  
  export async function fetchAllPokemon(limit = 20) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      const data = await response.json();
      
      return await fetchPokemonDetails(data.results);
    } catch (error) {
      console.error('Error fetching all Pokemon:', error);
      return [];
    }
  }
  
  export async function fetchPokemonDetails(pokemonList) {
    try {
      const pokemonDetailsPromises = pokemonList.map(async (pokemon) => {
        const detailsResponse = await fetch(pokemon.url);
        return await detailsResponse.json();
      });
      
      const pokemonDetails = await Promise.all(pokemonDetailsPromises);
      
      return pokemonDetails.map(pokemon => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
        types: pokemon.types.map(type => type.type.name)
      }));
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
      return [];
    }
  }
  
  export async function fetchPokemonByName(name) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      const pokemon = await response.json();

      const speciesResponse = await fetch(pokemon.species.url);
      const species = await speciesResponse.json();
      
      const description = species.flavor_text_entries.find(
        entry => entry.language.name === 'en'
      )?.flavor_text.replace(/\f/g, ' ') || 'No description available.';
      
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
        types: pokemon.types.map(type => type.type.name),
        height: pokemon.height / 10, 
        weight: pokemon.weight / 10,
        abilities: pokemon.abilities.map(ability => ability.ability.name),
        stats: pokemon.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
        })),
        description
      };
    } catch (error) {
      console.error(`Error fetching Pokemon details for ${name}:`, error);
      return null;
    }
  }