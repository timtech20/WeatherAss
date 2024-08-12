const APIkey = '98ef3fabf21d436781f2478e69bb7125';
let globUrl ;
const checkCity = () => {
    const cityName = document.getElementById('city').value;
    globUrl =`https://api.weatherbit.io/v2.0/current?city=${cityName}&KEY=${APIkey}`;
    // const url = `https://api.weatherbit.io/v2.0/current?city=${cityName}&KEY=${APIkey}`;
    if (cityName == "") {
        document.getElementById('trowError').innerHTML = "Please enter a city name";
        setTimeout(() => {
            document.getElementById('trowError').innerHTML = "";
        }, 800)
    }

    else {

        disWeather()
        

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
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`;
        document.getElementById('loading-icon').style.display = 'block';
        fetch(url)
            .then(response => response.json())
            .then(current => {
                console.log(current);
                document.getElementById('show').innerHTML = `
            <div class="show_div1"><h4>${current.name}, ${current.sys.country}</h4>
               <div> <h4>Date: ${date}</h4> 
               <h4>Time:${time}</h4>
               </div>
            </div>
            <div class="show_div2"><h4>${Math.ceil(current.main.temp-273.15)}°C</h4></div>
            <div class="show_div3"><h4>Humidity: ${current.main.humidity}%</h4>
            <h4>Description: ${current.weather[0].description}</h4></div>
            `;
            document.getElementById('loading-icon').style.display = 'none';
            })
            .catch(error => console.error('Error fetching the weather data:', error));
    });
}


// Call the getCurrentLocationWeather function when the page loads
getCurrentLocationWeather();

const disWeather = () =>{
    document.getElementById('loading-icon').style.display = 'block';
    fetch(globUrl)
        .then(response => response.json())
        .then(current => {
            console.log(current);
            document.getElementById('show').innerHTML = `
        <div class="show_div1"><h4>${current.data[0].city_name}, ${current.data[0].country_code}</h4>
        <h4>Time: ${current.data[0].ob_time}</h4></div>
        <div class="show_div2"><h4>${current.data[0].temp}°C</h4></div>
        <div class="show_div3"><h4>Humidity: ${current.data[0].rh}%</h4>
        <h4>Description: ${current.data[0].weather.description}</h4>
        <h4>Preciptation: ${current.data[0].precip}</h4></div>
        `;
        document.getElementById('loading-icon').style.display = 'none';
        })
        .catch(error => console.error('Error fetching the weather data:', error));
    document.getElementById('city').value = ""
}

