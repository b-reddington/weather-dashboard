let key = '77dc5ebc256a7aa57e335dc878ece7c7';
let searchVal = $('#location').val().trim();
// Displays Current Date
$('#currentDate').text(dayjs().format('MM/DD/YYYY'));

// When Button is Clicked, Update headers with context of input & save to localStorage
$('#searchBtn').click(function () {
    // get the value of oldSearches and create an empty array
    let oldSearches = JSON.parse(localStorage.getItem('oldSearches')) || [];
    // Push the value of #location into the empty array
    oldSearches.push($('#location').val());
    // Converts the array into a string
    let oldSearchesStr = JSON.stringify(oldSearches);
    // Store the string in local storage
    localStorage.setItem('oldSearches', oldSearchesStr);

    $('#city').text($('#location').val());
    const newBtn = $('<input type="button" class="btn btn-light col-12 mb-2" id="historyBtn" />').val($('#location').val());
    $('#search-history').append(newBtn);
    localStorage.setItem()
});

$('#search-history').click(function () {
    $('#search-history').remove();
})