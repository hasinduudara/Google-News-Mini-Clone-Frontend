import React, { useState } from 'react';

interface NavbarProps {
  onCategoryChange: (category: string) => void;
  onSearch: (term: string) => void; // <--- New Prop
}

const Navbar: React.FC<NavbarProps> = ({ onCategoryChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Local state for input
  
  const categories = ["general", "science", "sports", "business", "health", "entertainment", "tech", "politics", "food", "travel"];

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        onSearch(searchTerm);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between h-auto md:h-16 py-2 md:py-0 items-center">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer mb-2 md:mb-0 select-none" 
            onClick={() => {
                onCategoryChange("all");
                setSearchTerm(""); // Clear search when clicking logo
                onSearch("");
            }}
          >
            <span className="text-2xl font-bold text-gray-700">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
                <span className="ml-1 text-gray-500 font-normal">News</span>
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-96 focus-within:bg-white focus-within:shadow-md transition-all">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
                type="text" 
                placeholder="Search topics..." 
                className="bg-transparent outline-none w-full text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch} // <--- Listen for Enter key
            />
          </div>

        </div>

        {/* Category Links */}
        <div className="flex gap-6 overflow-x-auto py-3 text-sm font-medium text-gray-600 no-scrollbar">
            <button onClick={() => onCategoryChange("all")} className="hover:text-blue-600 whitespace-nowrap">Home</button>
            {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => onCategoryChange(cat)}
                  className="hover:text-blue-600 capitalize whitespace-nowrap"
                >
                  {cat}
                </button>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;