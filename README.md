# FUTURE_FS_01


# TASK 2 WEATHER DASHBOARD

## 🌦️ WeatherVerse - Advanced Weather Forecasting

[View Live Demo](https://warm-custard-8c9003.netlify.app)

A beautiful, modern weather dashboard built with React, TypeScript, and Tailwind CSS. Get real-time weather information, forecasts, and life indices for any city worldwide.

## 🚀 Features

- **Real-time Weather Data**: Get current weather conditions including temperature, humidity, wind speed, and more
- **5-Day Forecast**: View detailed weather predictions for the next 5 days
- **Hourly Forecast**: Track weather changes throughout the day with 3-hour interval forecasts
- **Location Detection**: Automatically detects user's location for instant local weather
- **Search History**: Keep track of recently searched cities
- **Favorites System**: Save your favorite cities for quick access
- **Life Index**: Get practical advice based on current weather conditions
- **Responsive Design**: Beautiful interface that works on all devices
- **Dynamic Backgrounds**: Weather-appropriate background images that change based on conditions
- **Day/Night Mode**: Automatic theme switching based on local sunrise/sunset times

## 🛠️ Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Vite
- Axios
- Date-fns
- Lucide React Icons

## 🔧 Installation & Setup

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```env
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
```

## 📱 Usage

1. **Current Weather**
   - View temperature, feels like, humidity, wind speed, and more
   - See sunrise and sunset times
   - Check visibility and pressure

2. **Search for Cities**
   - Use the search bar to find any city
   - Recent searches are saved automatically
   - Add cities to favorites for quick access

3. **Forecasts**
   - Scroll through hourly forecasts
   - View 5-day weather predictions
   - Check precipitation chances

4. **Life Index**
   - Get practical advice based on weather conditions
   - Receive warnings for extreme weather
   - View comfort level indicators

## 🔐 Security Note

For security purposes, the API key has been removed from the public repository. However, you can test the application using the live demo link provided above, which is fully functional with a secure API key.

## 📦 Production Build

To create a production build:
```bash
npm run build
```

## 🌐 Deployment

The project is deployed on Netlify and can be accessed at:
[https://warm-custard-8c9003.netlify.app](https://warm-custard-8c9003.netlify.app)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👏 Acknowledgments

- Weather data provided by OpenWeatherMap API
- Background images from Pexels
- Icons from Lucide React
