$(document).ready(function () {
var buttoncontainer=$('#buttonContainer');
console.log(buttoncontainer);
var cities = JSON.parse(localStorage.getItem("cities")) || [];
cities.forEach(city => {
    var button = $('<button>');
    console.log(button);
    button.text(city);
    button.val(city);
    buttoncontainer.append(button);
})
    var searchInput = $('input[name="userInput"]');
    var requestUrl;
    $('#searchButton').on('click', function (event) {
        event.preventDefault;
        
       var search = searchInput.val();
        console.log(search);
        fetchToGeo();


        // IN ORDER TO USE WEATHER API WE MUST OBEY THEIR RULE SO WE HAVE TO REQUEST FOR LON AND LAT BEFORE WE CAN FIND THE DATA
        function fetchToGeo() {

            requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + search.replace(/\s/g, '').toLowerCase() + '&limit=5&appid=f60935b102f3c62d074d56612d72ebbd';
            var LatIs, LonIs, returnData;
            fetch(requestUrl)
                .then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            returnData = data;
                            console.log(returnData, data);
                            LatIs = returnData[0].lat.toFixed(2);
                            LonIs = returnData[0].lon.toFixed(2);
                            fetchtoData(LatIs, LonIs);
                        })
                        // IF THE CODE GOES WRONG THEN SCREEN WILL ALERT ERROR
                    } else {
                        alert('Error' + response.statusText);
                        console.log('Initial Fetch status is:  ' + response.status);
                    }

                    // ONCE WE HAVE LAT && LON WE CAN INSERT THAT INTO FUNCTION AND REQUEST FOR THE DATA WE WANT
                    function fetchtoData(a, b) {
                        requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + a + '&lon=' + b + '&appid=f60935b102f3c62d074d56612d72ebbd';
                        fetch(requestUrl)
                            .then(function (response) {
                                if (response.ok) {
                                    response.json()
                                        .then(function (data) {
                                            allData = data;
                                            console.log(allData, data);
                                            var cityName = allData.city.name;
                                            var cityName = allData.city.name;
                                            if (!cities.includes(cityName)){
                                                cities.push(cityName);
                                            localStorage.setItem("cities", JSON.stringify(cities));
                                            var button = $('<button>');
                                            button.text(cityName).addClass('col-6 align-items-center');
                                            button.val(cityName);

                                            buttoncontainer.append(button);
                                            }
                                            var card = $('<div>').addClass('card mt-3 p-3 m-4');
                                            console.log(cityName);
                                            var header = $('<h4>').text("Search results for: " + cityName);
                                            card.append(header);
                                            $('#weatherdisplay').append(card);

                                            for (var i = 0; i < 39; i++) {
                                                var Date = allData.list[i].dt_txt.split(" ")[0].split("-")[2];
                                                var temp = allData.list[i].main.temp;
                                                var wind = allData.list[i].wind.speed;
                                                var humid = allData.list[i].main.humidity;
                                                var icon= allData.list[i].weather[0].icon;
                                                console.log(temp, wind, humid);
                                                renderData(Date, temp, wind, humid, icon);
                                                i += 7;
                                            }
                                        })
                                } else {
                                    alert('Error ' + response.statusText);
                                }
                            }
                            )
                    }
                })
        }
        function renderData(a, b, c, d, e) {
            var card = $('<div>').addClass('card mt-3 p-3 m-4');
            var header = $('<h4>').text("Weather Forecast for: October " + a);
            card.append(header);
            card.append($('<h6>').text("Temperature is: " + b + " ◦F"));
            card.append($('<h6>').text("Wind Speed is: " + c + " MPH"));
            card.append($('<h6>').text("Humidity is: " + d + " %"));
            card.append($(`<img style="width:50px;" src="https://openweathermap.org/img/w/${e}.png" >`));
            $('#weatherdisplay').append(card);
        }
    })
    $(window).keyup(function (e) {
        var code = e.key; // recommended to use e.key, it's normalized across devices and languages
        if (code === "Enter") e.preventDefault();
    })
})