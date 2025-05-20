import { format, fromUnixTime } from 'date-fns';

export const kelvinToCelsius = (kelvin: number): number => {
  return kelvin - 273.15;
};

export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

export const formatTime = (unixTime: number, timezone: number): string => {
  const date = fromUnixTime(unixTime + timezone);
  return format(date, 'h:mm a');
};

export const formatDay = (unixTime: number, timezone: number): string => {
  const date = fromUnixTime(unixTime + timezone);
  return format(date, 'EEE');
};

export const formatDate = (unixTime: number, timezone: number): string => {
  const date = fromUnixTime(unixTime + timezone);
  return format(date, 'MMM d');
};

export const isDaytime = (currentTime: number, sunrise: number, sunset: number): boolean => {
  return currentTime >= sunrise && currentTime <= sunset;
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export const groupForecastByDay = (forecastList: any[]): any[] => {
  const groupedForecast: any = {};
  
  forecastList.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!groupedForecast[date]) {
      groupedForecast[date] = [];
    }
    groupedForecast[date].push(item);
  });
  
  return Object.keys(groupedForecast).map((date) => {
    const dayData = groupedForecast[date];
    const temperatures = dayData.map((item: any) => item.main.temp);
    const maxTemp = Math.max(...temperatures);
    const minTemp = Math.min(...temperatures);
    
    const noonData = dayData.find((item: any) => item.dt_txt.includes('12:00:00')) || dayData[0];
    
    return {
      date,
      dt: noonData.dt,
      maxTemp,
      minTemp,
      weather: noonData.weather[0],
    };
  }).slice(0, 5);
};

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    return new Promise((resolve) => {
      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
  };
};

export const getSearchHistory = (): string[] => {
  const history = localStorage.getItem('searchHistory');
  return history ? JSON.parse(history) : [];
};

export const addToSearchHistory = (city: string): void => {
  const history = getSearchHistory();
  if (!history.includes(city)) {
    const newHistory = [city, ...history].slice(0, 5);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  }
};

export const getFavorites = (): string[] => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const addToFavorites = (city: string): void => {
  const favorites = getFavorites();
  if (!favorites.includes(city)) {
    const newFavorites = [...favorites, city];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  }
};

export const removeFromFavorites = (city: string): void => {
  const favorites = getFavorites();
  const newFavorites = favorites.filter(favorite => favorite !== city);
  localStorage.setItem('favorites', JSON.stringify(newFavorites));
};