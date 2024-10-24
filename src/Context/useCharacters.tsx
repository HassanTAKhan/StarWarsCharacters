import React, { createContext, useContext, useEffect, useState } from 'react';

interface Starship {
    name: string;
}

interface Film {
    title: string;
}

interface Homeworld {
    name: string;
}

export interface Character {
    name: string;
    hairColour: string;
    eyeColour: string;
    gender: string;
    homeworld: Homeworld;
    films: Film[];
    starships: Starship[];
    imageUrl?: string; 
}

interface CharactersContextType {
    characters: Character[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    fetchCharacters: (page: number) => void; 
    setCurrentPage: (page: number) => void; 
}

const CharactersContext = createContext<CharactersContextType | undefined>(undefined);

export const CharactersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const fetchCharacters = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
            if (!response.ok) {
                throw new Error('Failed to fetch characters');
            }
            const data = await response.json();
            setTotalPages(data.count > 0 ? Math.ceil(data.count / 10) : 0); 

            const charactersWithDetails = await Promise.all(data.results.map(async (character: any) => {
                const homeworldResponse = await fetch(character.homeworld);
                const homeworldData = await homeworldResponse.json();

                const films = await Promise.all(character.films.map(async (filmUrl: string) => {
                    const filmResponse = await fetch(filmUrl);
                    return await filmResponse.json();
                }));

                const starships = await Promise.all(character.starships.map(async (starshipUrl: string) => {
                    const starshipResponse = await fetch(starshipUrl);
                    return await starshipResponse.json();
                }));

                return {
                    ...character,
                    homeworld: homeworldData,
                    films,
                    starships,
                };
            }));

            setCharacters(charactersWithDetails);
            setCurrentPage(page);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters(currentPage);
    }, [currentPage]);

    return (
        <CharactersContext.Provider value={{ characters, loading, error, currentPage, totalPages, fetchCharacters, setCurrentPage }}>
            {children}
        </CharactersContext.Provider>
    );
};

export const useCharacters = () => {
    const context = useContext(CharactersContext);
    if (context === undefined) {
        throw new Error('useCharacters must be used within a CharactersProvider');
    }
    return context;
};
