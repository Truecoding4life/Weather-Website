var search = $('input[name="userInput"]');
$('#searchButton').on('click', function (event) {
    event.preventDefault;
    search = search.val();
    console.log(search);
    requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + search.replace(/\s/g, '').toLowerCase() + ',+1&limit=5&appid=f60935b102f3c62d074d56612d72ebbd';

    getAPI();
});
 function getAPI() {
    function API() {
        var locationLat, locationLon;
        var returnData;
        fetch(requestUrl)
            .then(function (response) {
                console.log("Request Link is :  " + requestUrl);
                return response.json();

            }).then(function (data) {
                console.log("Data received is   " + data,data);
                returnData = data;
                console.log(returnData,data);
                console.log("Return Data is   " + returnData,data);
                locationLat = returnData[0].lat.toFixed(2);
                locationLon = returnData[0].lon.toFixed(2);
                console.log("returned lat is: " + locationLat);
                console.log("returned lon is : " + locationLon);
                console.log('Lat and Lot is Fetched')
                weatherData();

            })
        function weatherData (){
            var newUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+locationLat+'&lon=' + locationLon+'&appid=f60935b102f3c62d074d56612d72ebbd'
            var allData;
            console.log("This URL WILL BE USE TO FETCH LOCATION  " + newUrl);
            fetch(newUrl)
                .then(function(response){
                    console.log('RETURN RESPONSE IS'+ response);
                    return response.json();
                })
                .then(function(data){
                    console.log(data,data);
                    allData=data;
                    console.log('data inside allData is:   '+allData,data);
                    console.log(allData.list[1]);
                    for(var i=0; i<4; i++){
                        console.log(allData.list[i]);
                        var titLe = $('<div>');
                        titLe.text(allData.city.name);
                        $('#day1').append(titLe);
                        $('#day1').text(allData[i].dt_txt);
                        // $('#weatherdisplay').append($('<div>')).addClass("card mt-3 p-3 m-4");
                        // // $('#weatherdisplay > div').append($('<h3>'))
                        // allData.city[1]
                    }
                })
        }
    }    
    API();
    // setTimeout(function () {
    //     console.log("FUNCTION TIMER ACTIVATED");
    //     var newUrl = 'api.openweathermap.org/data/2.5/forecast?lat='+locationLat+'&lon=' + locationLon+'&appid=f60935b102f3c62d074d56612d72ebbd'
    //     var justtest;
    //     console.log(newUrl);
    //     fetch(newUrl)
    //         .then(function(response){
    //             console.log('RETURN RESPONSE IS'+ response);
    //             return response.json();
    //         })
    //         .then(function(data){
    //             justtest=data;
    //             console.log(justtest);
    //         })
    // }, 300);
}


    // function getforecast () {
    //     requestUrl= 'api.openweathermap.org/data/2.5/forecast?lat='+locationLat+'&lon=' + locationLon+'&appid=f60935b102f3c62d074d56612d72ebbd';
    //     console.log("Request for 5 day forecast link is:    " + requestUrl);
    //     return requestUrl;
    // }
    // return (locationLat, locationLon);
