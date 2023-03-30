let key = '77dc5ebc256a7aa57e335dc878ece7c7';
// Displays Current Date
let now = dayjs().format('MM/DD/YYYY');
// let futre = dayjs().add(i, 'day');
$('#currentDate').text(now);
// Get the value of oldSearches and create an empty array
let oldSearches = JSON.parse(localStorage.getItem('oldSearches')) || [];
let searchHistoryId = $('#search-history');
// When Button is Clicked, Update headers with context of input & save to localStorage
$('#searchBtn').click(function () {
    // Push the value of #location into the empty array
    oldSearches.push($('#location').val());
    // Converts the array into a string
    let oldSearchesStr = JSON.stringify(oldSearches);
    // Store the string in local storage
    localStorage.setItem('oldSearches', oldSearchesStr);
    const newBtn = $('<input type="button" class="btn btn-light col-12 mb-2 historyBtn" />').val($('#location').val());
    searchHistoryId.append(newBtn);
    dailyWeather();
});

// This block of code creates buttons based on what is stored in localStorage
$.each(oldSearches, function (i, value) {
    const newBtn = $('<input type="button" class="btn btn-light col-12 mb-2 historyBtn" />').val(value);
    searchHistoryId.append(newBtn);
});

// Binds click event to the search-history container
searchHistoryId.on('click', '.historyBtn', function () {
    $('#city').text($(this).val());
});

// Create a clear History Button in the historyFooter div
const clearHistory = $('<input type="button" class="btn btn-danger col-12 mb-2" id="clearHistory" />');
clearHistory.val('Clear History');
$('#historyFooter').append(clearHistory);

$('#clearHistory').click(function () {
    // Clears the local storage
    localStorage.removeItem('oldSearches');

    // Remove history button
    $('.historyBtn').remove();
});

// Daily Weather API Handling

// When a previous button is clicked, update the value of dailyWeather
searchHistoryId.on('click', '.historyBtn', function () {
    const cityName = $(this).val();
    $('#location').val(cityName); // Set input value to clicked button value
    dailyWeather(cityName);
    forecast(cityName);
});

function dailyWeather() {
    let cityName = $('#location').val();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`)
    .then((response) => response.json())
    .then((data) => {
        // Updates the Header
        $('#city').text(`${$('#location').val()}`);
        // Updates the Body
        $('#dailyTemp').text(`Temp: ${data.main.temp} F`);
        $('#dailyWind').text(`Wind: ${data.wind.speed} Mph`);
        $('#dailyHumidity').text(`Humidity: ${data.main.humidity}%`);
    });
}

// 5 Day Forecast API Handling
function forecast() {
    let cityName = $('#location').val();
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=imperial`)
    .then((response) => response.json())
    .then((data) => {
        for (let i = 1; i <= 5; i++) {

            // create card element
            const card = $('<div class="card mx-auto col-sm-12 col-md-4 col-lg-2 m-1"></div>').attr('id', `day${i}`);
            // create card header with incrementing date
            const header = $('<div class="card-header"></div>').text(`${dayjs().add(i, 'day').format("MM-DD-YYYY")}`);
            // create card body
            const body = $('<div class="card-body"></div>');
            // create list group
            const li = $('<ul class="list-group list-group-flush"></ul>');
            // add list items with IDs
            let temp = $(`<li class="list-group-item" id="temp${i}"></li>`).text(data.list[i].main.temp + " F");
            let wind = $(`<li class="list-group-item" id="wind${i}"></li>`).text(data.list[i].wind.speed + " Mph");
            let humidity = $(`<li class="list-group-item" id="humidity${i}"></li>`).text(data.list[i].main.humidity + " %");
            // append list items to list group
            li.append(temp, wind, humidity);
            // append list group to card body
            body.append(li);
            // append header and body to card
            card.append(header, body);
            // append card to target element
            $('#5day').append(card);
        }
    })
}