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
        // document.getElementById('loading-icon').style.display = 'block';  

        Promise.all([
            fetch(globUrl).then(response => response.json()),
            fetch(url).then(response => response.json())
        ])
                .then(([currents,openWeatherResponse]) => {
                    console.log(currents);
                    document.getElementById('show').innerHTML = `
                    
                <div class="show_div1">
                <div class="show_div2">
                <div class="temp_div">
                <div class="temp_h4">${currents.current.temp_c}°C</div>
                </div>
                <div class="time_div">
                <div>
                <div class="city_h4">${currents.location.name}, ${openWeatherResponse.sys.country}</div>
                <h4 class="time_h4">${currents.location.localtime}</h4>
                </div>
                <img src=${currents.current.condition.icon} alt="" / width="70" style="border-radius: 50% ;">
                </div>
                </div>
                </div>
                

                <div class="show_con">
                <div class="show_con2">
                <div class="topText">Weather Details</div>
                <div class="show_div4">
                <div class="showH_div1"><h4  class="h4_disc">Humidity</h4>  <h4 class="h4_disc2"> ${currents.current.humidity}%</div>
                <div class="showH_div1"><h4  class="h4_disc">Description</h4> <h4 class="h4_disc2">${openWeatherResponse.weather[0].description}</h4></div>
                <div class="showH_div1"><h4  class="h4_disc">Preciptation</h4> <h4  class="h4_disc2">${currents.current.precip_mm}</h4></div>
                <div class="showH_div1"><h4  class="h4_disc">Wind</h4> <h4  class="h4_disc2">${currents.current.wind_mph} mph</h4></div>
                </div>
                <hr>
                <div class="show_div5">
                <div class="showH_div1"><div class="h4_disc"> Min</div> <h4  class="h4_disc2">${Math.ceil(openWeatherResponse.main.temp_min-273.15)}°C</h4></div>
                <div class="showH_div1"><div class="h4_disc"> Max</div> <h4  class="h4_disc2">${Math.ceil(openWeatherResponse.main.temp_max-273.15)}°C</h4></div>
                <div class="showH_div1"><div class="h4_disc"> Feels</div> <h4  class="h4_disc2"> ${Math.ceil(openWeatherResponse.main.feels_like-273.15)}°C</h4></div>
                <div class="showH_div1"><div class="h4_disc"> Pessure</div>  <h4 class="h4_disc2">${currents.current.pressure_mb}hPa</h4></div>
                </div>
                <div class="desMe">Designed by<a href="https://github.com/timtech20
                ">Timtech</a></div>
                </div>
                </div>
                `;
                // document.getElementById('loading-icon').style.display = 'none';
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
        // document.getElementById('loading-icon').style.display = 'block';
        Promise.all([
            fetch(globUrl).then(response => response.json()),
            fetch(url).then(response => response.json())
        ])
        .then(([currents,openWeatherResponse]) => {
                document.getElementById('show').innerHTML = `

                <div class="show_div1">
                <div class="show_div2">
                <div class="temp_div">
                <div class="temp_h4">${currents.current.temp_c}°C</div>
                </div>
                <div class="time_div">
                <div>
                <div class="city_h4">${currents.location.name}, ${openWeatherResponse.sys.country}</div>
                <h4 class="time_h4">${currents.location.localtime}</h4>
                </div>
                <img src=${currents.current.condition.icon} alt="" / width="70" style="border-radius: 50% ;">
                </div>
                </div>
                </div>
                

                <div class="show_con">
                <div class="show_con2">
                <div class="topText">Weather Details</div>
                <div class="show_div4">
                <div class="showH_div1"><h4  class="h4_disc">Humidity</h4>  <h4 class="h4_disc2"> ${currents.current.humidity}%</div>
                <div class="showH_div1"><h4  class="h4_disc">Description</h4> <h4 class="h4_disc2">${openWeatherResponse.weather[0].description}</h4></div>
                <div class="showH_div1"><h4  class="h4_disc">Preciptation</h4> <h4  class="h4_disc2">${currents.current.precip_mm}</h4></div>
                <div class="showH_div1"><h4  class="h4_disc">Wind</h4> <h4  class="h4_disc2">${currents.current.wind_mph} mph</h4></div>
                </div>
                <hr>
                <div class="show_div5">
                <div class="showH_div1"><div class="h4_disc"> Min</div> <h4  class="h4_disc2">${Math.ceil(openWeatherResponse.main.temp_min-273.15)}°C</h4></div>
                <div class="showH_div1"><div class="h4_disc"> Max</div> <h4  class="h4_disc2">${Math.ceil(openWeatherResponse.main.temp_max-273.15)}°C</h4></div>
                <div class="showH_div1"><div class="h4_disc"> Feels</div> <h4  class="h4_disc2"> ${Math.ceil(openWeatherResponse.main.feels_like-273.15)}°C</h4></div>
                <div class="showH_div1"><div class="h4_disc"> Pessure</div>  <h4 class="h4_disc2">${currents.current.pressure_mb}hPa</h4></div>
                </div>
                <div class="desMe">Designed by<a href="https://github.com/timtech20">Timtech</a></div>
                </div>
                </div>
                `;
            // document.getElementById('loading-icon').style.display = 'none';
            })
            .catch(error => console.error('Error fetching the weather data:', error));
    });
}


// Call the getCurrentLocationWeather function when the page loads
getCurrentLocationWeather();


