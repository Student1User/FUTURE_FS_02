import React from 'react';
import { motion } from 'framer-motion';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Sunrise, 
  Sunset,
  Gauge
} from 'lucide-react';
import { WeatherData } from '../utils/api';
import { formatTemperature, formatTime, isDaytime } from '../utils/helpers';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const isDay = isDaytime(
    Math.floor(Date.now() / 1000),
    data.sys.sunrise,
    data.sys.sunset
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gray-900/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-xl"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">
              {data.name}, {data.sys.country}
            </h2>
            <p className="text-lg text-blue-200 mt-1">
              {data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <img 
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
              className="w-20 h-20"
            />
            <div className="text-5xl font-bold text-white ml-2">
              {formatTemperature(data.main.temp)}
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 p-3 rounded-lg flex items-center">
            <Thermometer className="text-orange-400 mr-2" size={20} />
            <div>
              <p className="text-xs text-gray-300">Feels Like</p>
              <p className="text-lg font-semibold text-white">{formatTemperature(data.main.feels_like)}</p>
            </div>
          </div>
          
          <div className="bg-white/5 p-3 rounded-lg flex items-center">
            <Droplets className="text-blue-400 mr-2" size={20} />
            <div>
              <p className="text-xs text-gray-300">Humidity</p>
              <p className="text-lg font-semibold text-white">{data.main.humidity}%</p>
            </div>
          </div>
          
          <div className="bg-white/5 p-3 rounded-lg flex items-center">
            <Wind className="text-teal-400 mr-2" size={20} />
            <div>
              <p className="text-xs text-gray-300">Wind</p>
              <p className="text-lg font-semibold text-white">{Math.round(data.wind.speed * 3.6)} km/h</p>
            </div>
          </div>
          
          <div className="bg-white/5 p-3 rounded-lg flex items-center">
            <Gauge className="text-purple-400 mr-2" size={20} />
            <div>
              <p className="text-xs text-gray-300">Pressure</p>
              <p className="text-lg font-semibold text-white">{data.main.pressure} hPa</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between">
          <div className="flex items-center">
            <Sunrise className="text-yellow-400 mr-2" size={18} />
            <div>
              <p className="text-xs text-gray-300">Sunrise</p>
              <p className="text-sm font-medium text-white">
                {formatTime(data.sys.sunrise, data.timezone)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Sunset className="text-orange-400 mr-2" size={18} />
            <div>
              <p className="text-xs text-gray-300">Sunset</p>
              <p className="text-sm font-medium text-white">
                {formatTime(data.sys.sunset, data.timezone)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Eye className="text-blue-300 mr-2" size={18} />
            <div>
              <p className="text-xs text-gray-300">Visibility</p>
              <p className="text-sm font-medium text-white">
                {(data.visibility / 1000).toFixed(1)} km
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;