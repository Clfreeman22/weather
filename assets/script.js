

function getWeather(city) {
    var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=nashville&appid=ddce6e0f0b7c7edc2ab26d066d9a07e9`
    fetch(apiUrl)
        .then(function(response) {
           return response.json()
        })
        .then(function(data){
            if (data.length === 0) {
                defaultPage();

                alert("Could not find City");

            } else {
                console.log("location", data);

                var currentDate = moment().format("(MM/DD/YYYY)");
                console.log("Current date: ", currentDate);

                var lon = data[0].lon
                var lat= data[0].lat
                
                var cityWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=ddce6e0f0b7c7edc2ab26d066d9a07e9`

                fetch(cityWeatherUrl)
                    .then(function(response) {
                        return response.json()
                    })
                    .then(function(data) {
                        console.log("weather", data);
                    })
                };
            })
        };

getWeather();