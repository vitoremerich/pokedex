import React, { useContext } from 'react';
import { MdFavorite } from 'react-icons/md';
import PokemonContext from '../contexts/PokemonContext';
import '../styles/components/navbar.sass';
import Searchbar from './Searchbar';

export default function Navbar() {
  const { favorites } = useContext(PokemonContext);
  const logo = 'https://avatars.githubusercontent.com/u/64151210?v=4';
  return (
    <nav className="navbar-container">
      <a href="/">
        <img src={logo} alt="pokemon logo" />
      </a>
      <Searchbar />
      <p>
        <MdFavorite className="heart" />
        {favorites.length}
      </p>
    </nav>
  );
}
