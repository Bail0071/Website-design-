// 
// this file in an integrity check for the shipping form
// creates JSON doc if completed correctly
//

document.addEventListener('DOMContentLoaded', function() {
   // Select the form
   const form = document.querySelector('form');

   // Add event listener for form submission
   form.addEventListener('submit', function(event) {
       // Prevent default form submission
       event.preventDefault();

       // Get form values
       const destination = document.getElementById('destination').value.trim();
       const carrier = document.getElementById('carrier').value;
       const method = document.getElementById('method').value;

       // Check if fields are empty
       if (!destination) {
          alert('Please enter a shipping destination.');
           return;
       }
      if (carrier === 'Choose a carrier') {
           alert('Please select a shipping carrier.');
           return;
       }
       if (method === 'Choose a method') {
           alert('Please select a shipping method.');
           return;
       }

       // If all fields are filled, create a JSON document
       const shippingData = {
           shippingDestination: destination,
           shippingCarrier: carrier,
           shippingMethod: method
       };

      // Display the JSON data
      console.log('Shipping Data:', JSON.stringify(shippingData, null, 2));
       alert('Form submitted successfully!\nCheck the console for the JSON data.');
   })

      // Form Validation
      document.getElementById('shipping-form').addEventListener('submit', function(event) {
       const destination = document.getElementById('destination').value;
       const carrier = document.getElementById('carrier').value;
       const method = document.getElementById('method').value;

       if (!destination || !carrier || !method) {
          alert('Please fill out all fields.');
          event.preventDefault();
       }
   });
});
