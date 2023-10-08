var search = $('input[name="userInput"]');
var requestUrl;
$('#searchButton').on('click', function (event) {
    event.preventDefault;
    search = search.val();
    console.log(search);
    fetchToGeo();

    function fetchToGeo() {

        requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + search.replace(/\s/g, '').toLowerCase() + ',+1&limit=5&appid=f60935b102f3c62d074d56612d72ebbd';
        var LatIs, LonIs, returnData;
        fetch(requestUrl)
            .then(function (response){
             if (response.ok) {
                response.json().then(function (data) {
                returnData = data;
                console.log(returnData, data);
                LatIs = returnData[0].lat.toFixed(2);
                LonIs = returnData[0].lon.toFixed(2);
                fetchtoData(LatIs, LonIs);
            })

        } else {
            alert('Error' + response.statusText);
            console.log('Initital Fetch status is:  ' + response.status);}


function fetchtoData(a, b) {
    requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + a + '&lon=' + b + '&appid=f60935b102f3c62d074d56612d72ebbd';
    fetch(requestUrl) 
        .then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (data) {
                allData = data;
                console.log(allData,data);})
        } else {
            alert('Error ' + response.statusText);
        }
    })

    }
    })


    }})