import React, { Dispatch, SetStateAction } from "react";
import { Character } from "../../Context/useCharacters";

type Props = {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
  setFavourites: Dispatch<SetStateAction<Character[]>>;
  favourites: Character[];
  currentPage: number; 
  totalPages: number; 
  fetchCharacters: (page: number) => void; 
  displayFavourites: boolean;
};

const CharacterView = ({
  characters,
  onCharacterClick,
  setFavourites,
  favourites,
  currentPage,
  totalPages,
  fetchCharacters,
  displayFavourites,
}: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {characters.map((character, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 relative"
            onClick={() => onCharacterClick(character)}
          >
            <span
              className="absolute top-2 right-2 text-red-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (favourites.some((fav) => fav.name === character.name)) {
                  setFavourites((prevFavourites) =>
                    prevFavourites.filter((fav) => fav.name !== character.name)
                  );
                } else {
                  setFavourites((prevFavourites) => [
                    ...prevFavourites,
                    character,
                  ]);
                }
              }}
            >
              {favourites.some((fav) => fav.name === character.name)
                ? "❤️"
                : "🖤"}
            </span>

            <div className="mt-2">
              <h2 className="text-lg font-bold">{character.name}</h2>
              <p className="text-gray-600">{character.gender}</p>
              <p className="text-gray-600">{character.homeworld.name}</p>
            </div>
          </div>
        ))}
      </div>

      {!displayFavourites && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => fetchCharacters(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>{`Page ${currentPage} of ${totalPages}`}</span>

          <button
            onClick={() =>
              fetchCharacters(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterView;
