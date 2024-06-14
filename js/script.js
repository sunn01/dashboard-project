document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'YOUR_API_KEY'; // Replace with your own OpenWeatherMap API key
    const citySelect = document.querySelector('#citySelect');
    const weatherInfo = document.querySelector('.weather-info');
    const pageSelect = document.querySelector('#pageSelect');

    // Event listener for city selection change
    citySelect.addEventListener('change', function() {
        const selectedCity = citySelect.value;
        getWeather(selectedCity);
    });

    // Event listener for page selection change
    pageSelect.addEventListener('change', function() {
        const selectedPage = pageSelect.value;
        window.location.href = selectedPage;
    });

    // Function to fetch weather data
    function getWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                const feelsLike = data.main.feels_like;
                const humidity = data.main.humidity;

                const weatherHTML = `
                    <p><strong>City:</strong> ${city}</p>
                    <p><strong>Current Temperature:</strong> ${temperature}°C</p>
                    <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
                    <p><strong>Humidity:</strong> ${humidity}%</p>
                    <p><strong>Description:</strong> ${weatherDescription}</p>
                `;

                weatherInfo.innerHTML = weatherHTML;
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    // Load weather data for the default city when the page loads
    getWeather(citySelect.value);
});
