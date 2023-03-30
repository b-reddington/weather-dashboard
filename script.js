let key = '77dc5ebc256a7aa57e335dc878ece7c7';
let searchVal = $('#location').val().trim();
// Displays Current Date
$('#currentDate').text(dayjs().format('MM/DD/YYYY'));
// Get the value of oldSearches and create an empty array
let oldSearches = JSON.parse(localStorage.getItem('oldSearches')) || [];

// When Button is Clicked, Update headers with context of input & save to localStorage
$('#searchBtn').click(function () {
    // Push the value of #location into the empty array
    oldSearches.push($('#location').val());
    // Converts the array into a string
    let oldSearchesStr = JSON.stringify(oldSearches);
    // Store the string in local storage
    localStorage.setItem('oldSearches', oldSearchesStr);

    $('#city').text($('#location').val());
    const newBtn = $('<input type="button" class="btn btn-light col-12 mb-2 historyBtn" />').val($('#location').val());
    $('#search-history').append(newBtn);
});

// This block of code creates buttons based on what is stored in localStorage
$.each(oldSearches, function (i, value) {
    const newBtn = $('<input type="button" class="btn btn-light col-12 mb-2 historyBtn" />').val(value);
    $('#search-history').append(newBtn);
});

// Binds click event to the search-history container
$('#search-history').on('click', '.historyBtn', function () {
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
