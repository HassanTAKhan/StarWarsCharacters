import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { CharactersProvider, useCharacters } from './useCharacters';

const MockComponent = () => {
  const { characters, loading, error, fetchCharacters } = useCharacters();
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {characters.map((character) => (
        <div key={character.name}>
          <h1>{character.name}</h1>
        </div>
      ))}
      <button onClick={() => fetchCharacters(1)}>Fetch Characters</button>
    </div>
  );
};

describe('CharactersProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(
      <CharactersProvider>
        <MockComponent />
      </CharactersProvider>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('fetches characters and displays them', async () => {
    //@ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            count: 1,
            results: [
              {
                name: 'Luke Skywalker',
                hairColour: 'blond',
                eyeColour: 'blue',
                gender: 'male',
                homeworld: 'https://swapi.dev/api/planets/1/',
                films: ['https://swapi.dev/api/films/1/'],
                starships: ['https://swapi.dev/api/starships/12/'],
              },
            ],
          }),
      })
    );

    render(
      <CharactersProvider>
        <MockComponent />
      </CharactersProvider>
    );

    await screen.findByText("Luke Skywalker");
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it('handles errors during fetch', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch characters'))
    );

    render(
      <CharactersProvider>
        <MockComponent />
      </CharactersProvider>
    );

    await screen.findByText("Error: Failed to fetch characters");
  });
});
