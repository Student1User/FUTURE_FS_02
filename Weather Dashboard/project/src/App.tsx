import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, AlertCircle } from 'lucide-react';
import { 
  fetchWeatherData, 
  fetchForecastData,
  fetchWeatherByCoords,
  fetchForecastByCoords,
  getBackgroundImage, 
  WeatherData, 
  ForecastData 
} from './utils/api';
import { 
  isDaytime, 
  addToSearchHistory, 
  getFavorites,
  addToFavorites,
  removeFromFavorites 
} from './utils/helpers';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import LifeIndex from './components/LifeIndex';
import WeatherHeader from './components/WeatherHeader';

function App() {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>('https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg');
  const [isDay, setIsDay] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const fetchData = async (cityName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const weather = await fetchWeatherData(cityName);
      setWeatherData(weather);
      
      const currentTime = Math.floor(Date.now() / 1000);
      const daytime = isDaytime(currentTime, weather.sys.sunrise, weather.sys.sunset);
      setIsDay(daytime);
      
      const bgImage = getBackgroundImage(weather.weather[0].main, daytime);
      setBackgroundImage(bgImage);
      
      const forecast = await fetchForecastData(cityName);
      setForecastData(forecast);
      
      setCity(cityName);
      addToSearchHistory(cityName);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch weather data. Please check the city name and try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDataByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const weather = await fetchWeatherByCoords(lat, lon);
      setWeatherData(weather);
      
      const currentTime = Math.floor(Date.now() / 1000);
      const daytime = isDaytime(currentTime, weather.sys.sunrise, weather.sys.sunset);
      setIsDay(daytime);
      
      const bgImage = getBackgroundImage(weather.weather[0].main, daytime);
      setBackgroundImage(bgImage);
      
      const forecast = await fetchForecastByCoords(lat, lon);
      setForecastData(forecast);
      
      setCity(weather.name);
      addToSearchHistory(weather.name);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch weather data for your location. Defaulting to London.');
      fetchData('London');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (cityName: string) => {
    fetchData(cityName);
  };

  const handleToggleFavorite = (cityName: string) => {
    if (favorites.includes(cityName)) {
      removeFromFavorites(cityName);
      setFavorites(getFavorites());
    } else {
      addToFavorites(cityName);
      setFavorites(getFavorites());
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchDataByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          fetchData('London');
        }
      );
    } else {
      fetchData('London');
    }
  }, []);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="min-h-screen bg-gradient-to-b from-black/50 to-black/70 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <WeatherHeader city={city} isDay={isDay} />
          
          <SearchBar 
            onSearch={handleSearch} 
            onToggleFavorite={handleToggleFavorite}
            currentCity={city}
            isFavorite={favorites.includes(city)}
          />
          
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center mt-10"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-start"
              >
                <AlertCircle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-white">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!loading && !error && weatherData && forecastData && (
            <div className="mt-6 space-y-6">
              <CurrentWeather data={weatherData} />
              <HourlyForecast data={forecastData} />
              <DailyForecast data={forecastData} />
              <LifeIndex data={weatherData} />
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center text-xs text-gray-400 mt-8 pb-4"
              >
                <p>Data provided by OpenWeatherMap</p>
              </motion.div>
            </div>
          )}
          
          {!weatherData && !loading && !error && (
            <div className="flex flex-col items-center justify-center mt-20">
              <Cloud className="text-white/50" size={64} />
              <p className="text-white/70 mt-4 text-xl">Search for a city to get weather information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;