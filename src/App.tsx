import React, { useState } from "react";
import CharacterView from "./Components/CharacterView/CharacterView";
import SearchBar from "./Components/SearchBar/SearchBar";
import "./index.css";
import CharacterModal from "./Components/CharacterModal/CharacterModal";
import { Character, useCharacters } from "./Context/useCharacters";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayFavourites, setDisplayFavourites] = useState(false);
  const [favourites, setFavourites] = useState<Character[]>([]);

  const { characters, loading, error, currentPage, totalPages, fetchCharacters } = useCharacters();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  return (
    <div className="App">
      <h1 className="pt-10 text-xl font-bold text-center">
        Star Wars Characters 🌌
      </h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <button
        onClick={() => setDisplayFavourites(!displayFavourites)}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-red-600 w-full"
      >
        {displayFavourites ? "Back to search" : "Check out your favourites"}
      </button>

      <CharacterView
        characters={displayFavourites ? favourites : filteredCharacters}
        onCharacterClick={handleCharacterClick}
        setFavourites={setFavourites}
        favourites={favourites}
        currentPage={currentPage}
        totalPages={totalPages}     
        fetchCharacters={fetchCharacters} 
        displayFavourites={displayFavourites}
      />

      <CharacterModal
        handleCloseModal={handleCloseModal}
        isModalOpen={isModalOpen}
        selectedCharacter={selectedCharacter}
        setFavourites={setFavourites}
        favourites={favourites}
      />
    </div>
  );
}

export default App;
