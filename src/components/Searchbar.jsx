import React, { useContext, useEffect } from 'react';
import fetchPokemons from '../services/api';
import PokemonContext from '../contexts/PokemonContext';
import '../styles/components/searchbar.sass';

export default function Searchbar() {
  const {
    search, setSearch, setPokemon, setLoading, setError, isDisabled, setDisabled,
  } = useContext(PokemonContext);
  const handleClick = async () => {
    try {
      setLoading(true);
      const pokemons = await fetchPokemons(`/pokemon/${search.toLowerCase()}`);
      const poke = pokemons.data;
      setPokemon([poke]);
      setError(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const disabledButtonFunc = () => (search.length > 0 ? setDisabled(false) : setDisabled(true));

  useEffect(() => {
    disabledButtonFunc();
  }, [search]);

  return (
    <div className="search-container">
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button type="button" disabled={isDisabled} onClick={handleClick}>Pesquisar</button>
    </div>
  );
}
