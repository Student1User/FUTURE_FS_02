import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, Moon } from 'lucide-react';

interface WeatherHeaderProps {
  city?: string;
  isDay: boolean;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({ city, isDay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-6"
    >
      <div className="flex items-center">
        {isDay ? (
          <Sun className="text-yellow-400 mr-2" size={28} />
        ) : (
          <Moon className="text-blue-200 mr-2" size={28} />
        )}
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          WeatherVerse
        </h1>
      </div>
      
      {city && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-right"
        >
          <p className="text-sm text-gray-300">
            {new Date().toLocaleDateString(undefined, { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WeatherHeader;