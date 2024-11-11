function fetchReturnsData() {
  $.getJSON('returns.json', function(returnsData) {
    console.log('Returns Data:', returnsData);
    // Populate the return form with past order data or process it further
  }).fail(function() {
    console.log('Error loading returns data.');
  });
}

$(document).ready(function() {
  fetchReturnsData();
});
