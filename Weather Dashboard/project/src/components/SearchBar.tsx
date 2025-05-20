import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { debounce, getSearchHistory, getFavorites } from '../utils/helpers';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onToggleFavorite: (city: string) => void;
  currentCity: string;
  isFavorite: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onToggleFavorite, currentCity, isFavorite }) => {
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchHistory(getSearchHistory());
    setFavorites(getFavorites());
    
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setShowHistory(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleHistoryItemClick = (city: string) => {
    setQuery(city);
    onSearch(city);
    setShowHistory(false);
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setShowHistory(true)}
            placeholder="Search city..."
            className="w-full px-4 py-3 pl-10 pr-24 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Search className="absolute left-3 text-white/60" size={18} />
          {query && (
            <button 
              onClick={clearSearch}
              className="absolute right-20 text-white/60 hover:text-white"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={handleSearch}
            className="absolute right-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1"
          >
            <Search size={16} />
          </button>
          {currentCity && (
            <button
              onClick={() => onToggleFavorite(currentCity)}
              className="absolute right-3 text-white/60 hover:text-yellow-400 transition-colors"
            >
              {isFavorite ? (
                <Heart className="fill-yellow-400 text-yellow-400" size={18} />
              ) : (
                <Heart size={18} />
              )}
            </button>
          )}
        </div>
      </motion.div>
      
      {showHistory && (searchHistory.length > 0 || favorites.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute z-10 mt-1 w-full bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-700 overflow-hidden"
        >
          {favorites.length > 0 && (
            <>
              <div className="p-2 text-xs text-gray-400 border-b border-gray-700 flex items-center">
                <Heart size={12} className="mr-1 fill-yellow-400 text-yellow-400" /> Favorites
              </div>
              <ul className="border-b border-gray-700">
                {favorites.map((city, index) => (
                  <li 
                    key={`fav-${index}`}
                    onClick={() => handleHistoryItemClick(city)}
                    className="px-4 py-2 hover:bg-gray-700/50 cursor-pointer text-white text-sm transition-colors flex items-center"
                  >
                    <Heart size={12} className="mr-2 fill-yellow-400 text-yellow-400" />
                    {city}
                  </li>
                ))}
              </ul>
            </>
          )}
          
          {searchHistory.length > 0 && (
            <>
              <div className="p-2 text-xs text-gray-400 border-b border-gray-700 flex items-center">
                <Clock size={12} className="mr-1" /> Recent searches
              </div>
              <ul>
                {searchHistory.map((city, index) => (
                  <li 
                    key={`history-${index}`}
                    onClick={() => handleHistoryItemClick(city)}
                    className="px-4 py-2 hover:bg-gray-700/50 cursor-pointer text-white text-sm transition-colors"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;