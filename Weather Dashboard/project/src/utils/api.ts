import axios from 'axios';

// OpenWeatherMap API configuration
const API_KEY = '47c07f8831e956dfba00c856c4309335';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    '1h'?: number;
    '3h'?: number;
  };
  snow?: {
    '1h'?: number;
    '3h'?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      '3h': number;
    };
    snow?: {
      '3h': number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

const handleError = (error: any) => {
  console.error('API Error:', error);
  if (error.response?.status === 429) {
    throw new Error('API rate limit exceeded. Please try again later.');
  }
  throw error;
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchForecastData = async (city: string): Promise<ForecastData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const getBackgroundImage = (weatherCondition: string, isDay: boolean): string => {
  const timeOfDay = isDay ? 'day' : 'night';
  
  const weatherBackgrounds: Record<string, Record<string, string>> = {
    Clear: {
      day: 'https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg',
      night: 'https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg',
    },
    Clouds: {
      day: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg',
      night: 'https://images.pexels.com/photos/2885320/pexels-photo-2885320.jpeg',
    },
    Rain: {
      day: 'https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg',
      night: 'https://images.pexels.com/photos/1906932/pexels-photo-1906932.jpeg',
    },
    Drizzle: {
      day: 'https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg',
      night: 'https://images.pexels.com/photos/1906932/pexels-photo-1906932.jpeg',
    },
    Thunderstorm: {
      day: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg',
      night: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg',
    },
    Snow: {
      day: 'https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg',
      night: 'https://images.pexels.com/photos/773594/pexels-photo-773594.jpeg',
    },
    Mist: {
      day: 'https://images.pexels.com/photos/1743392/pexels-photo-1743392.jpeg',
      night: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg',
    },
    Fog: {
      day: 'https://images.pexels.com/photos/1743392/pexels-photo-1743392.jpeg',
      night: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg',
    },
    Haze: {
      day: 'https://images.pexels.com/photos/1743392/pexels-photo-1743392.jpeg',
      night: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg',
    },
  };

  const defaultBackground = 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg';
  return weatherBackgrounds[weatherCondition]?.[timeOfDay] || defaultBackground;
};

export const getLifeIndex = (weatherData: WeatherData): string[] => {
  const messages: string[] = [];
  
  const temp = weatherData.main.temp;
  if (temp > 30) {
    messages.push('🥵 Extreme heat - stay hydrated and avoid direct sun.');
  } else if (temp > 25) {
    messages.push('🌡️ Hot weather - consider light clothing and sun protection.');
  } else if (temp < 0) {
    messages.push('❄️ Freezing temperatures - dress warmly in layers.');
  } else if (temp < 10) {
    messages.push('🧣 Cold weather - a jacket is recommended.');
  } else {
    messages.push('🌤️ Comfortable temperature for outdoor activities.');
  }
  
  if (weatherData.rain && weatherData.rain['1h'] > 0) {
    messages.push('☔ Rain expected - carry an umbrella.');
  }
  if (weatherData.snow && weatherData.snow['1h'] > 0) {
    messages.push('🌨️ Snow expected - be careful on roads and walkways.');
  }
  
  if (weatherData.wind.speed > 10) {
    messages.push('💨 Strong winds - secure loose items outdoors.');
  }
  
  if (weatherData.main.humidity > 80) {
    messages.push('💧 High humidity - may feel warmer than actual temperature.');
  } else if (weatherData.main.humidity < 30) {
    messages.push('🏜️ Low humidity - stay hydrated.');
  }
  
  if (weatherData.visibility < 1000) {
    messages.push('🌫️ Poor visibility - drive carefully.');
  }
  
  return messages;
};