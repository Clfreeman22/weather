
function findCity() {
	var address = $('#address').val();
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({ address: address }, (results, status) => {
    	if (status === "OK") {
            var lat = results[0].geometry.location.lat();
			var lng = results[0].geometry.location.lng();
            var weatherapi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=hourly,daily,alerts&appid=ddce6e0f0b7c7edc2ab26d066d9a07e9";
            fetch(weatherapi, {
                "method": "GET"
            }
                .then(response => response.json())
                .then(data => console.log(data))
                .then(function(response) {
                    response.json().then(function(data) {
                      console.log(data);
                    })
                })
                .catch(err => {
                    console.error(err);
                })
        }
		else {
        	alert("Geocode error: " + status);
    	};	
    }
}; 