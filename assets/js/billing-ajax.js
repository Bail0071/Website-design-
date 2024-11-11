function fetchBillingDetails() {
  $.getJSON('billing.json', function(billingData) {
    console.log('Billing Data:', billingData);
    // Populate the page with billing data or process it further
  }).fail(function() {
    console.log('Error loading billing data.');
  });
}

$(document).ready(function() {
  fetchBillingDetails();
});
