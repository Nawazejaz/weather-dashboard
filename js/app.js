// Main Application Logic

class WeatherDashboard {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.locationBtn = document.getElementById('locationBtn');
        this.suggestionsEl = document.getElementById('suggestions');
        this.lastCity = localStorage.getItem('lastCity') || CONFIG.DEFAULT_CITY;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadWeather(this.lastCity);
    }

    setupEventListeners() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        this.searchInput.addEventListener('input', (e) => this.handleSuggestions(e.target.value));
        this.locationBtn.addEventListener('click', () => this.handleGeolocation());
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.suggestionsEl.innerHTML = '';
            }
        });
    }

    async handleSearch() {
        const city = this.searchInput.value.trim();
        if (!city) return;

        this.searchInput.value = '';
        this.suggestionsEl.innerHTML = '';
        await this.loadWeather(city);
    }

    async handleSuggestions(query) {
        if (query.length < 2) {
            this.suggestionsEl.innerHTML = '';
            return;
        }

        try {
            const results = await weatherAPI.searchCities(query);
            this.displaySuggestions(results);
        } catch (error) {
            console.error('Suggestion error:', error);
        }
    }

    displaySuggestions(cities) {
        this.suggestionsEl.innerHTML = '';

        if (cities.length === 0) return;

        cities.slice(0, 5).forEach(city => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = `${city.name}${city.sys ? ', ' + city.sys.country : ''}`;
            div.addEventListener('click', () => {
                this.searchInput.value = city.name;
                this.handleSearch();
            });
            this.suggestionsEl.appendChild(div);
        });
    }

    async handleGeolocation() {
        if (!navigator.geolocation) {
            weatherUI.showError('Geolocation is not supported by your browser');
            return;
        }

        weatherUI.showLoading();
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                await this.loadWeatherByCoordinates(latitude, longitude);
            },
            (error) => {
                weatherUI.showError(`Geolocation error: ${error.message}`);
            }
        );
    }

    async loadWeather(city) {
        if (!CONFIG.API_KEY || CONFIG.API_KEY === 'YOUR_API_KEY_HERE') {
            weatherUI.showError('⚠️ API key not configured. Please add your OpenWeatherMap API key to js/config.js');
            return;
        }

        weatherUI.showLoading();

        try {
            const current = await weatherAPI.getCurrentWeather(city);
            const forecast = await weatherAPI.getForecast(city);

            weatherUI.displayCurrentWeather(current, forecast);
            weatherUI.displayHourlyForecast(forecast);
            weatherUI.displayDailyForecast(forecast);

            localStorage.setItem('lastCity', city);
            this.lastCity = city;
            weatherUI.hideLoading();
        } catch (error) {
            weatherUI.showError(error.message);
        }
    }

    async loadWeatherByCoordinates(lat, lon) {
        if (!CONFIG.API_KEY || CONFIG.API_KEY === 'YOUR_API_KEY_HERE') {
            weatherUI.showError('⚠️ API key not configured. Please add your OpenWeatherMap API key to js/config.js');
            return;
        }

        try {
            const current = await weatherAPI.getWeatherByCoordinates(lat, lon);
            const forecast = await weatherAPI.getForecastByCoordinates(lat, lon);

            weatherUI.displayCurrentWeather(current, forecast);
            weatherUI.displayHourlyForecast(forecast);
            weatherUI.displayDailyForecast(forecast);

            localStorage.setItem('lastCity', current.name);
            this.lastCity = current.name;
            weatherUI.hideLoading();
        } catch (error) {
            weatherUI.showError(error.message);
        }
    }
}

// Initialize dashboard when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new WeatherDashboard();
    });
} else {
    new WeatherDashboard();
}