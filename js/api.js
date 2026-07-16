// Weather API Functions

class WeatherAPI {
    constructor(config) {
        this.config = config;
        this.cache = new Map();
    }

    /**
     * Get current weather for a city
     */
    async getCurrentWeather(city) {
        const cacheKey = `current_${city}`;
        if (this.isCached(cacheKey)) {
            return this.getCache(cacheKey);
        }

        try {
            const url = `${this.config.BASE_URL}/weather?q=${city}&appid=${this.config.API_KEY}&units=${this.config.UNITS}`;
            const response = await this.fetchWithTimeout(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'City not found');
            }

            this.setCache(cacheKey, data);
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch current weather: ${error.message}`);
        }
    }

    /**
     * Get forecast for a city
     */
    async getForecast(city) {
        const cacheKey = `forecast_${city}`;
        if (this.isCached(cacheKey)) {
            return this.getCache(cacheKey);
        }

        try {
            const url = `${this.config.BASE_URL}/forecast?q=${city}&appid=${this.config.API_KEY}&units=${this.config.UNITS}`;
            const response = await this.fetchWithTimeout(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Forecast not available');
            }

            this.setCache(cacheKey, data);
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch forecast: ${error.message}`);
        }
    }

    /**
     * Get weather by coordinates (latitude, longitude)
     */
    async getWeatherByCoordinates(lat, lon) {
        const cacheKey = `current_${lat}_${lon}`;
        if (this.isCached(cacheKey)) {
            return this.getCache(cacheKey);
        }

        try {
            const url = `${this.config.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.config.API_KEY}&units=${this.config.UNITS}`;
            const response = await this.fetchWithTimeout(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Could not fetch weather for location');
            }

            this.setCache(cacheKey, data);
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch weather by coordinates: ${error.message}`);
        }
    }

    /**
     * Get forecast by coordinates
     */
    async getForecastByCoordinates(lat, lon) {
        const cacheKey = `forecast_${lat}_${lon}`;
        if (this.isCached(cacheKey)) {
            return this.getCache(cacheKey);
        }

        try {
            const url = `${this.config.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.config.API_KEY}&units=${this.config.UNITS}`;
            const response = await this.fetchWithTimeout(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Forecast not available');
            }

            this.setCache(cacheKey, data);
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch forecast by coordinates: ${error.message}`);
        }
    }

    /**
     * Search for cities (autocomplete)
     */
    async searchCities(query) {
        if (!query || query.length < 2) return [];

        try {
            const url = `${this.config.BASE_URL}/find?q=${query}&type=like&appid=${this.config.API_KEY}&units=${this.config.UNITS}`;
            const response = await this.fetchWithTimeout(url);
            const data = await response.json();

            if (!response.ok) {
                return [];
            }

            return data.list || [];
        } catch (error) {
            console.error('Search error:', error);
            return [];
        }
    }

    /**
     * Fetch with timeout
     */
    fetchWithTimeout(url) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.TIMEOUT);

        return fetch(url, { signal: controller.signal })
            .then(response => {
                clearTimeout(timeoutId);
                return response;
            })
            .catch(error => {
                clearTimeout(timeoutId);
                if (error.name === 'AbortError') {
                    throw new Error('Request timeout');
                }
                throw error;
            });
    }

    /**
     * Cache management
     */
    setCache(key, value) {
        this.cache.set(key, {
            data: value,
            timestamp: Date.now()
        });
    }

    getCache(key) {
        const cached = this.cache.get(key);
        return cached ? cached.data : null;
    }

    isCached(key) {
        const cached = this.cache.get(key);
        if (!cached) return false;

        const isExpired = Date.now() - cached.timestamp > this.config.CACHE_DURATION;
        if (isExpired) {
            this.cache.delete(key);
            return false;
        }
        return true;
    }

    clearCache() {
        this.cache.clear();
    }
}

// Initialize API
const weatherAPI = new WeatherAPI(CONFIG);