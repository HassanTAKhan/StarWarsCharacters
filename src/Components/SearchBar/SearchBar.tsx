import React from 'react';

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div className="flex justify-center my-4">
      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
