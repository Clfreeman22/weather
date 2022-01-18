var cityInputEl = document.querySelector("#search-bar");
var formInputEl = document.querySelector('#form')
var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        findCity(city);
        cityInputEl.value ="";
    }
    else {
        alert("help")
    }
    console.log(event);
    window.city = city
};
var findCity = function(lat,lng){
var weatherapi ='https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lng + '&exclude=minutely,hourly&appid=ddce6e0f0b7c7edc2ab26d066d9a07e9'
var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: city }, (results, status) => {
        if (status === "OK") {
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            console.log(lat);
        } 
        else {
            alert("Geocode error: " + status);
        }	 
    })
};
formInputEl.addEventListener("submit",formSubmitHandler);

document.getElementById("search-btn").addEventListener("click",findCity())
 