import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import PokemonContext from './contexts/PokemonContext';

export default function App() {
  const [search, setSearch] = useState('');
  const [pokemons, setPokemon] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [favorites, setFavorite] = useState([]);
  const [errorMsg, setError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDisabled, setDisabled] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(50);

  const expandModal = (pokemon) => {
    setSelectedProject(pokemon);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsOpen(false);
  };

  const favoriteFunction = (name) => {
    const index = favorites.indexOf(name);
    const updatedFavorites = [...favorites];
    if (index >= 0) {
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.push(name);
    }
    window.localStorage.setItem('favoritePokemon', JSON.stringify(updatedFavorites));
    setFavorite(updatedFavorites);
  };

  const loadFavorites = () => {
    const pokemonsFav = JSON.parse(window.localStorage.getItem('favoritePokemon')) || [];
    setFavorite(pokemonsFav);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const Global = useMemo(
    () => ({
      search,
      setSearch,
      pokemons,
      setPokemon,
      isLoading,
      setLoading,
      favoriteFunction,
      favorites,
      errorMsg,
      setError,
      modalIsOpen,
      setIsOpen,
      expandModal,
      closeModal,
      selectedProject,
      isDisabled,
      setDisabled,
      offset,
      setOffset,
      limit,
      setLimit,
    }),
    [search,
      setSearch,
      pokemons,
      setPokemon,
      isLoading,
      setLoading,
      favoriteFunction,
      favorites,
      errorMsg,
      setError,
      modalIsOpen,
      setIsOpen,
      expandModal,
      closeModal,
      selectedProject,
      isDisabled,
      setDisabled,
      offset,
      setOffset,
      limit,
      setLimit,
    ],
  );

  return (
    <PokemonContext.Provider value={Global}>
      <Navbar />
      <Pokedex />
    </PokemonContext.Provider>
  );
}
