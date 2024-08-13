const APIkey = 'a84e82e01c494f079c1115049242007';
let globUrl ;
const checkCity = () => {
    const cityName = document.getElementById('city').value;
    globUrl =`http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${cityName}`;
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
            <div class="show_div2"><h4>${Math.ceil(current.main.temp-273.15)}°C</h4>
            <h4 class="h4_div2">${current.weather[0].main}</h4>
            </div>
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
        <div class="show_div1"><h4>${current.location.name}, ${current.location.country}</h4>
        <h4>Local Time: ${current.location.localtime}</h4></div>

        `;
        document.getElementById('loading-icon').style.display = 'none';
        })
        .catch(error => console.error('Error fetching the weather data:', error));
    document.getElementById('city').value = ""
}

