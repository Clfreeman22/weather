var searchBtnEl = document.querySelector("#search-btn");
var cityNameEl = document.querySelector("#search-bar");
var searchedCityName = document.querySelector("#city-name");
var searchContainerEl = document.querySelector("#search-list");
var updatedForecastEl = document.querySelector("#current-forcast");
var currentDateEl = document.querySelector("#current-date");
var weatherIconEl = document.querySelector("#icon");
var currentTempEl = document.querySelector("#temperature-value");
var currentHumidityEl = document.querySelector("#humidity-value");
var currentWindSpeedEl = document.querySelector("#windspeed-value");
var currentUVIndexEl = document.querySelector("#uv-value");
var forecastContainerEl = document.querySelector("#forecast-card");
var searchedCities = JSON.parse(localStorage.getItem('cities')) || [];
var lastSearchEl;


function newCity(data) {

    var lastSearchEl = document.createElement("div");
    lastSearchEl.setAttribute("id", "previous-search");
    lastSearchEl.innerHTML = data[0].name;
    searchContainerEl.appendChild(lastSearchEl);

    lastSearchEl.addEventListener("click", function() {
        var previousCity = lastSearchEl.innerHTML;
        getWeather(previousCity);
        searchedCityName.innerHTML = previousCity;

    })
}

function buildExistingCities(data) {
    for (var i = 1; i <= localStorage.length; i++) {
        newCity(data);
    }   
}

function getWeather(city) {
    var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=ddce6e0f0b7c7edc2ab26d066d9a07e9`
    fetch(apiUrl)
        .then(function(response) {
           return response.json()
        })
        .then(function(data){
            if (data.length === 0) {
                defaultPage();
                alert("Could not find City");

            } else {
                
                if (searchedCities.includes(data[0].name)) {
                    searchedCities.push(data[0].name)
                    localStorage.setItem('cities', JSON.stringify(searchedCities));
                    buildExistingCities(data);
                } 

                var currentDate = moment().format("(MM/DD/YYYY)");
                console.log("Current date: ", currentDate);
                currentDateEl.innerText = currentDate;

                var lon = data[0].lon
                var lat= data[0].lat
                
                var cityWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=ddce6e0f0b7c7edc2ab26d066d9a07e9`

                fetch(cityWeatherUrl)
                    .then(function(response) {
                        return response.json()
                    })
                    .then(function(data) {
                        console.log("weather", data);
                    

                var weatherIcon = data.current.weather[0].icon;
                
                weatherIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
                
                currentTempEl.innerHTML = data.current.temp + " °F";
                currentHumidityEl.innerHTML = data.current.humidity + " %";
                currentWindSpeedEl.innerHTML = data.current.wind_speed + " mph";

                currentUVIndexEl.innerHTML = data.current.uvi; 
                        if (data.current.uvi <= 3) {
                            currentUVIndexEl.style.backgroundColor = "green";
                        } else if (data.current.uvi > 3 && data.current.uvi <= 6) {
                            currentUVIndexEl.style.backgroundColor = "yellow";
                        } else if (data.current.uvi > 6 && data.current.uvi <= 8) {
                            currentUVIndexEl.style.backgroundColor = "orange";
                        } else {
                            currentUVIndexEl.style.backgroundColor = "red";
                        }
                        function addCards() {
                            
                        forecastContainerEl.innerHTML = "";
                            
                        for (i= 0; i <=4; i++) {
                                
                            var newCard = document.createElement("div");
                            newCard.className = "card";
                            newCard.setAttribute("id", "card-style");
                            forecastContainerEl.appendChild(newCard);
    
                                
                            var cardBody = document.createElement("div");
                            cardBody.className = "card-body";
    
                               
                            var cardTitle = document.createElement("h5");
                            cardTitle.className = "day-title";
                            var currentDate = moment().add(i + 1, 'days').format("MM/DD/YYYY");
                            cardTitle.innerHTML = currentDate;
    
                            
                            var cardIcon = document.createElement("img");
                            cardIcon.className = "day-icon";
                            var dailyWeatherIcon = data.daily[i].weather[0].icon;
                            cardIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + dailyWeatherIcon + "@2x.png");
    
                            
                            var cardTemp = document.createElement("p");
                            cardTemp.className = "day-temp";
                            cardTemp.innerHTML = "Temp: " + data.daily[i].temp.max + " °F";
    
                                
                            var cardWind = document.createElement("p");
                            cardWind.className = "day-wind";
                            cardWind.innerHTML = "Wind: " + data.daily[i].wind_speed + "mph";
    
                               
                            var cardHumidity = document.createElement("p");
                            cardHumidity.className = "day-humidity";
                            cardHumidity.innerHTML = "Humidity: " + data.daily[i].humidity + "%";
    
    
                                
                            newCard.appendChild(cardBody);
                            cardBody.appendChild(cardTitle);
                            cardBody.appendChild(cardIcon);
                            cardBody.appendChild(cardTemp);
                            cardBody.appendChild(cardWind);
                            cardBody.appendChild(cardHumidity);
    
                            }
    
                        }
    
                        addCards();
                    })
                };
            })
        };

function defaultPage() {
searchedCityName.innerHTML = "";
currentDateEl.innerHTML = "";
currentWeatherIconEl.setAttribute("src", "");
currentTempEl.innerHTML = "";
currentHumidityEl.innerHTML = "";
currentWindSpeedEl.innerHTML = "";
currentUVIndexEl.innerHTML = "";
forecastContainerEl.innerHTML = "";
}      

function searchForCityClick(event) {
    event.preventDefault();
    var searchedCity = cityNameEl.value;
    getWeather(searchedCity);
    searchedCityName.innerHTML = searchedCity;
}

searchBtnEl.addEventListener("click", searchForCityClick);
