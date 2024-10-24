import React, { Dispatch, SetStateAction } from "react";
import Modal from "react-modal";
import { Character } from "../../Context/useCharacters";

type Props = {
  selectedCharacter: Character | null; 
  isModalOpen: boolean;
  handleCloseModal: () => void;
  setFavourites: Dispatch<SetStateAction<Character[]>>;
  favourites: Character[];
};

const CharacterModal = ({
  selectedCharacter,
  isModalOpen,
  handleCloseModal,
  setFavourites,
  favourites,
}: Props) => (
  <Modal
    isOpen={isModalOpen}
    onRequestClose={handleCloseModal}
    className="bg-white p-4 shadow-lg w-full h-full sm:max-w-md sm:mx-auto sm:mt-20 sm:mb-4"
    overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    {selectedCharacter && (
      <>
        {/* <img
          src={selectedCharacter.imageUrl}
          alt={selectedCharacter.name}
          className="w-full h-48 object-cover rounded-lg my-2"
        /> */}
        <div className="text-center">
          <h2 className="text-xl font-bold">{`Name: ${selectedCharacter.name}`}</h2>
          <p>{`Home Planet: ${selectedCharacter.homeworld.name}`}</p>
          <p>{`Eye Colour: ${selectedCharacter.eyeColour}`}</p> 
          <p>{`Gender: ${selectedCharacter.gender}`}</p>
          <p>{`Hair Colour: ${selectedCharacter.hairColour}`}</p>
          <p>{`Films Appeared In: ${selectedCharacter.films.map((film: any) => film.title).join(', ')}`}</p>
          <p>{selectedCharacter.starships.length > 0 && `Starships Piloted: ${selectedCharacter.starships.map((ship: any) => ship.name).join(', ')}`}</p>
        </div>

        <span 
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            if (favourites.some(fav => fav.name === selectedCharacter.name)) {
              setFavourites(prevFavourites => prevFavourites.filter(fav => fav.name !== selectedCharacter.name));
            } else {
              setFavourites(prevFavourites => [...prevFavourites, selectedCharacter]);
            }
          }}
        >
          {favourites.some(fav => fav.name === selectedCharacter.name) ? "❤️" : "🖤"}
        </span>

        <button
          onClick={handleCloseModal}
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
        >
          Close
        </button>
      </>
    )}
  </Modal>
);

export default CharacterModal;
