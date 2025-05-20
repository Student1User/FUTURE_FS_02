import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ForecastData } from '../utils/api';
import { formatTemperature, formatTime } from '../utils/helpers';

interface HourlyForecastProps {
  data: ForecastData;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  
  // Get next 24 hours (8 items with 3-hour intervals)
  const hourlyData = data.list.slice(0, 8);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full bg-gray-900/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-xl mt-6"
    >
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-4">Hourly Forecast</h3>
        
        <div className="relative">
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full p-1"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto pb-2 scrollbar-hide space-x-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {hourlyData.map((hour, index) => (
              <div 
                key={index}
                className="flex-shrink-0 bg-white/5 rounded-lg p-3 w-24 flex flex-col items-center"
              >
                <p className="text-sm font-medium text-gray-300">
                  {formatTime(hour.dt, data.city.timezone)}
                </p>
                <img 
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                  alt={hour.weather[0].description}
                  className="w-12 h-12 my-1"
                />
                <p className="text-lg font-semibold text-white">
                  {formatTemperature(hour.main.temp)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {Math.round(hour.pop * 100)}% <span className="text-blue-300">☂️</span>
                </p>
              </div>
            ))}
          </div>
          
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full p-1"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HourlyForecast;