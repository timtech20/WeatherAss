const APIkey = 'a84e82e01c494f079c1115049242007';
const APIkeyTwo = 'd98fa62403f66e02c7d6548fb8127938';
let globUrl ;
const checkCity = () => {
    const cityName = document.getElementById('city').value;
    globUrl =`https://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${cityName}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkeyTwo}`;
    if (cityName == "") {
        document.getElementById('trowError').innerHTML = "Please enter a city name";
        setTimeout(() => {
            document.getElementById('trowError').innerHTML = "";
        }, 800)
    }

    else {
        document.getElementById('loading-icon').style.display = 'block';

        Promise.all([
            fetch(globUrl).then(response => response.json()),
            fetch(url).then(response => response.json())
        ])
                .then(([currents,openWeatherResponse]) => {
                    console.log(currents);
                    document.getElementById('show').innerHTML = `
                <div class="show_div1"><div><h4>${currents.location.name}, ${currents.location.country}</h4></div>
                <div><h4>Timestamp: ${currents.location.localtime}</h4></div></div>
                <div class="show_div2"><h4>${currents.current.temp_c}°C</h4></div>
                <div class="show_div3"><h4>Humidity:${currents.current.humidity} %</h4>
                <h4>Description: ${openWeatherResponse.weather[0].description}</h4>
                <h4>Preciptation: ${currents.current.precip_mm}</h4></div>
                `;
                document.getElementById('loading-icon').style.display = 'none';
                })
                .catch(error => console.error('Error fetching the weather data:', error));
            document.getElementById('city').value = ""
    }
}

document.getElementById('city').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkCity();
    }
});

const getCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const time = new Date().toLocaleTimeString()
        const date = new Date().toLocaleDateString()
        let API = 'd98fa62403f66e02c7d6548fb8127938'
        globUrl =`https://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${lat},${lon}`;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`;
        document.getElementById('loading-icon').style.display = 'block';
        Promise.all([
            fetch(globUrl).then(response => response.json()),
            fetch(url).then(response => response.json())
        ])
        .then(([currents,openWeatherResponse]) => {
                document.getElementById('show').innerHTML = `
             <div class="show_div1"><h4>${currents.location.name}, ${currents.location.country}</h4>
                <div><h4>Date: ${date}</h4>
                <h4>Time: ${time}</h4>
                </div>
                </div>
                <div class="show_div2"><h4>${currents.current.temp_c}°C</h4></div>
                <div class="show_div3"><h4>Humidity:${currents.current.humidity} %</h4>
                <h4>Description: ${openWeatherResponse.weather[0].description}</h4>
                <h4>Preciptation: ${currents.current.precip_mm}</h4></div>
                `;
            document.getElementById('loading-icon').style.display = 'none';
            })
            .catch(error => console.error('Error fetching the weather data:', error));
    });
}


// Call the getCurrentLocationWeather function when the page loads
getCurrentLocationWeather();


