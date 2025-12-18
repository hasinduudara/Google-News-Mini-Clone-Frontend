import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo Section */}
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-700">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
                <span className="ml-1 text-gray-500 font-normal">News Clone</span>
              </span>
            </div>
          </div>
          
          {/* Simple Search Bar (Visual Only for now) */}
          <div className="flex items-center">
            <input 
              type="text" 
              placeholder="Search for topics, locations & sources" 
              className="hidden md:block w-96 bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:bg-white focus:shadow-md transition duration-200"
            />
          </div>
          
          <div className="flex items-center gap-4">
             <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Sign In
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;