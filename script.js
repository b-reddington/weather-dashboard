let key = '77dc5ebc256a7aa57e335dc878ece7c7';
let searchVal = $('#location').val().trim();

// Displays Current Date
$('#date').text(dayjs().format('MM/DD/YYYY'));

// When Button is Clicked, Update headers with context of input
$('#searchBtn').click(function () {
    $('#city').text($('#location').val());

    // Create code to push previously searched locations
    // Add previous locations into localStorage
});