import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterModal from '../CharacterModal';
import { Character } from '../../../Context/useCharacters';

const mockCharacter: Character = {
  name: 'Luke Skywalker',
  hairColour: 'blond',
  eyeColour: 'blue',
  gender: 'male',
  homeworld: { name: 'Tatooine' },
  films: [{ title: 'A New Hope' }, { title: 'The Empire Strikes Back' }],
  starships: [{ name: 'X-wing' }],
  imageUrl: 'https://example.com/luke.jpg',
};

describe('CharacterModal', () => {
  const setFavourites = jest.fn();
  const handleCloseModal = jest.fn();

  it('renders the modal with character details', () => {
    render(
      <CharacterModal
        selectedCharacter={mockCharacter}
        isModalOpen={true}
        handleCloseModal={handleCloseModal}
        setFavourites={setFavourites}
        favourites={[]}
      />
    );

    expect(screen.getByText("Name: Luke Skywalker")).toBeInTheDocument();
  });

  it('calls handleCloseModal when close button is clicked', () => {
    render(
      <CharacterModal
        selectedCharacter={mockCharacter}
        isModalOpen={true}
        handleCloseModal={handleCloseModal}
        setFavourites={setFavourites}
        favourites={[]}
      />
    );

    fireEvent.click(screen.getByText("Close"));
    expect(handleCloseModal).toHaveBeenCalledTimes(1);
  });
});
