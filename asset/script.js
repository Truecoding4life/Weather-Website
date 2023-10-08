var search = $('input[name="userInput"]');
$('#searchButton').on('click', function (event) {
    event.preventDefault;
    search = search.val();
    console.log(search);
    requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + search.replace(/\s/g, '').toLowerCase() + '&appid=f60935b102f3c62d074d56612d72ebbd';

    getAPI();
});
 function getAPI() {
    var locationLat, locationLon;
    function API() {
        var returnData;
        fetch(requestUrl)
            .then(function (response) {
                console.log("Request Link is :  " + requestUrl);
                return response.json();
            }).then(function (data) {
                console.log("Data received is" + data);
                returnData = data
                locationLat = returnData[0].lat.toFixed(2);
                locationLon = returnData[0].lon.toFixed(2);
                console.log("returned lat is: " + locationLat);
                console.log("returned lon is : " + locationLon);
                return (locationLat, locationLon);
            })
    }    
    API();
    setTimeout(function () {
        console.log("FUNCTION TIMER ACTIVATED");

    }, 300);
}


    // function getforecast () {
    //     requestUrl= 'api.openweathermap.org/data/2.5/forecast?lat='+locationLat+'&lon=' + locationLon+'&appid=f60935b102f3c62d074d56612d72ebbd';
    //     console.log("Request for 5 day forecast link is:    " + requestUrl);
    //     return requestUrl;
    // }
    // return (locationLat, locationLon);
