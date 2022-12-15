import React, { useContext } from 'react';
import '../styles/components/pokemoncard.sass';
import PropTypes, { string, number } from 'prop-types';
import { MdFavoriteBorder, MdFavorite, MdInfoOutline } from 'react-icons/md';
import Modal from 'react-modal';
import PokemonContext from '../contexts/PokemonContext';

export default function PokemonCard({ pokemon }) {
  const {
    favoriteFunction, favorites, selectedProject, modalIsOpen, closeModal, expandModal,
  } = useContext(PokemonContext);
  const favIcon = favorites.includes(pokemon.name) ? (
    <MdFavorite className="favorite" />
  ) : (
    <MdFavoriteBorder className="heart" />
  );

  return (
    <div className="pokemon-container">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <div className="buttons-container">
        <button type="button" onClick={() => favoriteFunction(pokemon.name)}>{favIcon}</button>
        <button onClick={() => expandModal(pokemon)} type="button">
          <MdInfoOutline className="info" />
        </button>
        <Modal overlayClassName="overlay" className="Modal" ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h1>{selectedProject && selectedProject.name}</h1>
          <img
            src={selectedProject
            && selectedProject.sprites.front_default}
            alt={selectedProject && selectedProject.name}
          />
          <img
            src={selectedProject
            && selectedProject.sprites.back_default}
            alt="poke-back"
          />
          <h1>shiny version</h1>
          <img
            src={selectedProject
            && selectedProject.sprites.front_shiny}
            alt="poke-shiny"
          />
          <button type="button" onClick={closeModal}>Fechar</button>
        </Modal>
      </div>
    </div>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    name: string,
    id: number,
    sprites: PropTypes.shape({
      back_default: PropTypes.string,
      front_default: PropTypes.string,
    }),
  }).isRequired,
};
