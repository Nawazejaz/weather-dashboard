# Weather Dashboard

A modern, responsive weather dashboard that fetches real-time weather data from a public API and displays current conditions, hourly forecast, and 7-day forecast.

## Features

- 🌡️ **Real-time Weather Data** — Displays current temperature, humidity, wind speed, and more
- 📍 **Location Search** — Search for weather by city name
- 📅 **7-Day Forecast** — Extended forecast with daily highs/lows
- ⏰ **Hourly Forecast** — Hourly weather predictions
- 🎨 **Responsive Design** — Works on desktop, tablet, and mobile
- 🌙 **Dark/Light Mode** — Toggle between themes
- 📱 **Geolocation** — Auto-detect user's location (with permission)

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **API:** OpenWeatherMap (Free Tier)
- **Styling:** Modern CSS with flexbox/grid
- **Storage:** LocalStorage for preferences

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- OpenWeatherMap API key (free)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nawazejaz/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Get an API Key:**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key

3. **Configure API Key:**
   - Open `js/config.js`
   - Replace `YOUR_API_KEY_HERE` with your actual API key

4. **Open in Browser:**
   ```bash
   # Option 1: Direct file
   open index.html
   
   # Option 2: Use a local server
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

## Usage

1. **Search for a City:**
   - Enter a city name in the search box
   - Press Enter or click the search button
   - Weather data updates instantly

2. **Use Geolocation:**
   - Click the location icon
   - Allow browser permission
   - Dashboard shows weather for your current location

3. **Toggle Theme:**
   - Click the theme toggle button (top-right)
   - Dashboard switches between light and dark modes

4. **View Forecast:**
   - Scroll down to see hourly and 7-day forecasts
   - Click on any day to see more details

## Project Structure

```
weather-dashboard/
├── index.html          # Main HTML file
├── css/
│   ├── styles.css      # Main stylesheet
│   └── responsive.css  # Mobile responsive styles
├── js/
│   ├── config.js       # API configuration
│   ├── api.js          # API calls and data fetching
│   ├── ui.js           # UI rendering and updates
│   ├── theme.js        # Theme management
│   └── app.js          # Main application logic
├── assets/
│   └── icons/          # Weather icons
└── README.md           # This file
```

## API Reference

### OpenWeatherMap Endpoints Used

- **Current Weather:** `/weather?q={city}&appid={API_KEY}`
- **Forecast:** `/forecast?q={city}&appid={API_KEY}`
- **Geolocation:** `/weather?lat={lat}&lon={lon}&appid={API_KEY}`

## Features in Detail

### Current Weather Display
- Temperature, "feels like" temperature
- Weather description and icon
- Humidity, wind speed, pressure
- Sunrise/sunset times
- UV index

### Hourly Forecast
- 24-hour forecast with 3-hour intervals
- Temperature and weather conditions
- Precipitation probability

### 7-Day Forecast
- Daily high/low temperatures
- Weather conditions and icons
- Precipitation probability
- Wind speed

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### "API key not configured"
- Ensure `js/config.js` has a valid API key
- Check that the key is active on OpenWeatherMap website

### "Location not found"
- Verify the city name spelling
- Try searching with country code (e.g., "London, UK")

### "Geolocation not working"
- Ensure the site uses HTTPS (required for geolocation)
- Check browser permissions for location access

## Future Enhancements

- [ ] Weather alerts and notifications
- [ ] Multiple location comparison
- [ ] Historical weather data
- [ ] Air quality index display
- [ ] Weather maps integration
- [ ] Voice search functionality
- [ ] Export weather reports (PDF/CSV)
- [ ] Integration with calendar for event planning

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

**Nawazejaz**

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Stay weather-aware! 🌦️**