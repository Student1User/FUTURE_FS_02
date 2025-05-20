import React from 'react';
import { motion } from 'framer-motion';
import { ForecastData } from '../utils/api';
import { formatTemperature, formatDay, formatDate, groupForecastByDay } from '../utils/helpers';

interface DailyForecastProps {
  data: ForecastData;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ data }) => {
  const dailyData = groupForecastByDay(data.list);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full bg-gray-900/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-xl mt-6"
    >
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-4">5-Day Forecast</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {dailyData.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white/5 rounded-lg p-4 flex flex-col items-center"
            >
              <p className="text-sm font-medium text-blue-200">
                {formatDay(day.dt, data.city.timezone)}
              </p>
              <p className="text-xs text-gray-400">
                {formatDate(day.dt, data.city.timezone)}
              </p>
              <img 
                src={`https://openweathermap.org/img/wn/${day.weather.icon}.png`}
                alt={day.weather.description}
                className="w-14 h-14 my-2"
              />
              <div className="flex justify-between w-full mt-1">
                <p className="text-sm font-medium text-white">
                  {formatTemperature(day.maxTemp)}
                </p>
                <p className="text-sm font-medium text-gray-400">
                  {formatTemperature(day.minTemp)}
                </p>
              </div>
              <p className="text-xs text-center text-gray-300 mt-1">
                {day.weather.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DailyForecast;