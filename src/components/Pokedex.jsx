import React, { useEffect, useContext } from 'react';
import fetchPokemons from '../services/api';
import PokemonCard from './PokemonCard';
import '../styles/components/pokedex.sass';
import PokemonContext from '../contexts/PokemonContext';
import Loading from '../images/pikachu-running.gif';

export default function Pokedex() {
  const {
    pokemons, setPokemon, search, setLoading, isLoading, errorMsg, setError,
    offSet, setOffset, limit, setLimit,
  } = useContext(PokemonContext);
  const getAllInfo = async (url) => {
    const response = await fetchPokemons.get(url);
    const { id, types, sprites } = response.data;
    return {
      id, types, sprites,
    };
  };

  const getPokemons = async () => {
    setLoading(true);
    const response = await fetchPokemons.get('/pokemon');
    const { results } = response.data;
    const payload = await Promise.all(
      results.map(async (pokemon) => {
        const {
          id, types, sprites, abilities, stats,
        } = await getAllInfo(pokemon.url);
        return {
          name: pokemon.name,
          id,
          types,
          sprites,
          abilities,
          stats,
        };
      }),
    );
    setPokemon(payload);
    setLoading(false);
  };

  const loadMore = async () => {
    const fetchMore = await fetchPokemons.get(`/pokemon?limit=${limit}&offset=${offSet}`);
    const { results } = fetchMore.data;
    const payload = await Promise.all(
      results.map(async (pokemon) => {
        const {
          id, types, sprites, abilities, stats,
        } = await getAllInfo(pokemon.url);
        return {
          name: pokemon.name,
          id,
          types,
          sprites,
          abilities,
          stats,
        };
      }),
    );
    setLimit(limit + 25);
    setOffset((prevState) => (prevState + 25));
    setPokemon(payload);
  };

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    if (search.length === 0) {
      setError(false);
      getPokemons();
    }
  }, [search]);

  return (
    <div className="pokedex">
      {errorMsg === true ? (
        <h1>Pokemon não encontrado</h1>
      ) : (
        <div className="pokedex-container">
          {isLoading ? (
            <div className="loading-container">
              <img src={Loading} alt="pikachu-loading" />
              <h1>Carregando...</h1>
            </div>
          ) : (
            pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))
          )}
        </div>
      )}
      <button className="button-load" type="button" onClick={loadMore}>Carregar mais...</button>
    </div>
  );
}
