// UI Rendering Functions

class WeatherUI {
    constructor() {
        this.currentWeatherElement = document.querySelector('.current-weather');
        this.hourlyForecastElement = document.getElementById('hourlyForecast');
        this.dailyForecastElement = document.getElementById('dailyForecast');
        this.mainContent = document.getElementById('mainContent');
        this.loading = document.getElementById('loading');
        this.errorMessage = document.getElementById('errorMessage');
    }

    /**
     * Display current weather
     */
    displayCurrentWeather(current, forecast) {
        const temp = Math.round(current.main.temp);
        const feelsLike = Math.round(current.main.feels_like);
        const description = current.weather[0].description;
        const humidity = current.main.humidity;
        const windSpeed = (current.wind.speed * 3.6).toFixed(1); // Convert m/s to km/h
        const pressure = current.main.pressure;
        const visibility = (current.visibility / 1000).toFixed(1);
        const sunrise = new Date(current.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(current.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        // Update location and date
        document.getElementById('locationName').textContent = `${current.name}, ${current.sys.country}`;
        document.getElementById('weatherDate').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        // Update weather icon and temperature
        document.getElementById('weatherIcon').textContent = this.getWeatherEmoji(current.weather[0].main);
        document.getElementById('currentTemp').innerHTML = `<span class="temp-value">${temp}°</span><span class="temp-unit">C</span>`;
        document.getElementById('feelsLike').textContent = `Feels like ${feelsLike}°`;
        document.getElementById('weatherDescription').textContent = description.charAt(0).toUpperCase() + description.slice(1);

        // Update weather details
        document.getElementById('humidity').textContent = `${humidity}%`;
        document.getElementById('windSpeed').textContent = `${windSpeed} km/h`;
        document.getElementById('pressure').textContent = `${pressure} hPa`;
        document.getElementById('visibility').textContent = `${visibility} km`;
        document.getElementById('sunrise').textContent = sunrise;
        document.getElementById('sunset').textContent = sunset;
    }

    /**
     * Display hourly forecast
     */
    displayHourlyForecast(forecast) {
        const hourlyData = forecast.list.slice(0, 8); // Next 24 hours (3-hour intervals)
        let html = '';

        hourlyData.forEach(item => {
            const time = new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const temp = Math.round(item.main.temp);
            const icon = this.getWeatherEmoji(item.weather[0].main);
            const rain = item.rain ? item.rain['3h'] || 0 : 0;

            html += `
                <div class="hourly-item">
                    <div class="hourly-time">${time}</div>
                    <div class="hourly-icon">${icon}</div>
                    <div class="hourly-temp">${temp}°</div>
                    <div class="hourly-rain">${rain > 0 ? `${rain}mm` : 'No rain'}</div>
                </div>
            `;
        });

        this.hourlyForecastElement.innerHTML = html;
    }

    /**
     * Display 7-day forecast
     */
    displayDailyForecast(forecast) {
        const dailyData = this.aggregateDailyForecast(forecast.list);
        let html = '';

        dailyData.forEach((day, index) => {
            if (index >= 7) return; // Only show 7 days

            const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            const high = Math.round(day.main.temp_max);
            const low = Math.round(day.main.temp_min);
            const icon = this.getWeatherEmoji(day.weather[0].main);
            const rain = day.pop ? Math.round(day.pop * 100) : 0;

            html += `
                <div class="daily-item">
                    <div class="daily-date">${date}</div>
                    <div class="daily-icon">${icon}</div>
                    <div class="daily-temps">
                        <span class="temp-high">${high}°</span>
                        <span class="temp-low">${low}°</span>
                    </div>
                    <div class="daily-rain">💧 ${rain}%</div>
                </div>
            `;
        });

        this.dailyForecastElement.innerHTML = html;
    }

    /**
     * Aggregate forecast data by day
     */
    aggregateDailyForecast(forecastList) {
        const daily = {};

        forecastList.forEach(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString('en-US');

            if (!daily[date]) {
                daily[date] = {
                    dt: item.dt,
                    main: {
                        temp_max: item.main.temp_max,
                        temp_min: item.main.temp_min
                    },
                    weather: item.weather,
                    pop: item.pop
                };
            } else {
                daily[date].main.temp_max = Math.max(daily[date].main.temp_max, item.main.temp_max);
                daily[date].main.temp_min = Math.min(daily[date].main.temp_min, item.main.temp_min);
                if (item.pop > (daily[date].pop || 0)) {
                    daily[date].pop = item.pop;
                }
            }
        });

        return Object.values(daily);
    }

    /**
     * Get emoji for weather condition
     */
    getWeatherEmoji(condition) {
        const emojis = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
            'Smoke': '💨',
            'Haze': '🌫️',
            'Dust': '🌪️',
            'Fog': '🌫️',
            'Sand': '🌪️',
            'Ash': '💨',
            'Squall': '🌪️',
            'Tornado': '🌪️'
        };
        return emojis[condition] || '🌤️';
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.loading.style.display = 'flex';
        this.mainContent.style.display = 'none';
        this.hideError();
    }

    /**
     * Hide loading state
     */
    hideLoading() {
        this.loading.style.display = 'none';
        this.mainContent.style.display = 'block';
    }

    /**
     * Show error message
     */
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        this.mainContent.style.display = 'none';
        this.loading.style.display = 'none';
    }

    /**
     * Hide error message
     */
    hideError() {
        this.errorMessage.style.display = 'none';
    }
}

// Initialize UI
const weatherUI = new WeatherUI();