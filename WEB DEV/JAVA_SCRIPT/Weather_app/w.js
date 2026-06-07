const apikey = "71b940e5ad336118ece1975a3c765b7c";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const SearchBox = document.querySelector(".search input")

const SearchBtn = document.querySelector(".search button") 

const WeatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apikey}`)

    let data = await response.json();



    document.querySelector(".city").innerHTML = data.name

    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"

    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"

    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"
    
    if(data.weather[0].main == "Clouds"){
      WeatherIcon.src = "imgs/clouds.png"
    }

   else if(data.weather[0].main == "Clear"){
      WeatherIcon.src = "imgs/clear.png"
    }

    else if(data.weather[0].main == "Rain"){
      WeatherIcon.src = "imgs/rain.png"
    }

    else if(data.weather[0].main == "Drizzle"){
      WeatherIcon.src = "imgs/drizzel.png"
    }

   document.querySelector(".weather").style.display= "bock";
}

SearchBtn.addEventListener("click", ()=>{
 checkWeather(SearchBox.value);
})
