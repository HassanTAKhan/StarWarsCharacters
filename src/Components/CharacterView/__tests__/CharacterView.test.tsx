import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterView from '../CharacterView';
import { Character } from '../../../Context/useCharacters';

const mockCharacters: Character[] = [
  {
    name: 'Luke Skywalker',
    hairColour: 'blond',
    eyeColour: 'blue',
    gender: 'male',
    homeworld: { name: 'Tatooine' },
    films: [{ title: 'A New Hope' }, { title: 'The Empire Strikes Back' }],
    starships: [{ name: 'X-wing' }],
    imageUrl: 'https://example.com/luke.jpg',
  },
  {
    name: 'Darth Vader',
    hairColour: 'black',
    eyeColour: 'yellow',
    gender: 'male',
    homeworld: { name: 'Tatooine' },
    films: [{ title: 'A New Hope' }],
    starships: [],
    imageUrl: 'https://example.com/vader.jpg',
  },
];

describe('CharacterView', () => {
  const setFavourites = jest.fn();
  const fetchCharacters = jest.fn();

  it('renders character cards', () => {
    render(
      <CharacterView
        characters={mockCharacters}
        onCharacterClick={jest.fn()}
        setFavourites={setFavourites}
        favourites={[]}
        currentPage={1}
        totalPages={2}
        fetchCharacters={fetchCharacters}
        displayFavourites={false}
      />
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Darth Vader")).toBeInTheDocument();
  });

  it('calls fetchCharacters with previous page when previous button is clicked', () => {
    render(
      <CharacterView
        characters={mockCharacters}
        onCharacterClick={jest.fn()}
        setFavourites={setFavourites}
        favourites={[]}
        currentPage={2}
        totalPages={2}
        fetchCharacters={fetchCharacters}
        displayFavourites={false}
      />
    );

    fireEvent.click(screen.getByText("Previous"));
    expect(fetchCharacters).toHaveBeenCalledWith(1);
  });

  it('calls fetchCharacters with next page when next button is clicked', () => {
    render(
      <CharacterView
        characters={mockCharacters}
        onCharacterClick={jest.fn()}
        setFavourites={setFavourites}
        favourites={[]}
        currentPage={1}
        totalPages={2}
        fetchCharacters={fetchCharacters}
        displayFavourites={false}
      />
    );

    fireEvent.click(screen.getByText("Next"));
    expect(fetchCharacters).toHaveBeenCalledWith(2);
  });

  it('disables previous button on the first page', () => {
    render(
      <CharacterView
        characters={mockCharacters}
        onCharacterClick={jest.fn()}
        setFavourites={setFavourites}
        favourites={[]}
        currentPage={1}
        totalPages={2}
        fetchCharacters={fetchCharacters}
        displayFavourites={false}
      />
    );

    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled(); 
  });

  it('disables next button on the last page', () => {
    render(
      <CharacterView
        characters={mockCharacters}
        onCharacterClick={jest.fn()}
        setFavourites={setFavourites}
        favourites={[]}
        currentPage={2}
        totalPages={2}
        fetchCharacters={fetchCharacters}
        displayFavourites={false}
      />
    );

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });
});
