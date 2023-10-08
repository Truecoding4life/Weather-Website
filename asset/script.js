var search = $('input[name="userInput"]');
var requestUrl;
$('#searchButton').on('click', function (event) {
    event.preventDefault;
    search = search.val();
    console.log(search);
    fetchToGeo();


    // IN ORDER TO USE WEATHER API WE MUST OBEY THEIR RULE SO WE HAVE TO REQUEST FOR LON AND LAT BEFORE WE CAN FIND THE DATA
    function fetchToGeo() {

        requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + search.replace(/\s/g, '').toLowerCase() + ',+1&limit=5&appid=f60935b102f3c62d074d56612d72ebbd';
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
                                    })
                                var cityName = allData.city.name;
                                var Date = allData.list[0].dt;
                                for( var i=0; i<39;i++){
                                    var temp= allData.list[i].temp;
                                    var wind=allData.list[i].wind.speed;
                                    var humid=allData.list[i].main.humidity;
                                }

                            } else {
                                alert('Error ' + response.statusText);
                            }
                            function renderData(a,b,c,d){
                                var card=$('<div>').addClass('card mt-3 p-3 m-4');
                                var header=$('<h4>').text(a);
                                $('<h6>').text(b).append(card);
                                $('<h6>').text(c).append(card);
                                $('<h6>').text(d).append(card);
                                card.append($('#weatherdisplay'));

                            }
                        })
                }
            })
    }
})