// Weather Dashboard Configuration

const CONFIG = {
    // OpenWeatherMap API Key
    // Get your free API key from: https://openweathermap.org/api
    API_KEY: 'YOUR_API_KEY_HERE',
    
    // Base URL for OpenWeatherMap API
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    
    // Units: 'metric' for Celsius, 'imperial' for Fahrenheit
    UNITS: 'metric',
    
    // Default city on first load
    DEFAULT_CITY: 'London',
    
    // Cache duration in milliseconds (5 minutes)
    CACHE_DURATION: 5 * 60 * 1000,
    
    // Timeout for API requests (10 seconds)
    TIMEOUT: 10000
};

// Validate API Key
if (CONFIG.API_KEY === 'YOUR_API_KEY_HERE') {
    console.warn('⚠️ API key not configured! Please set your OpenWeatherMap API key in js/config.js');
}