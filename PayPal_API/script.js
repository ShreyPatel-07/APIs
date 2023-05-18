paypal.Buttons({
    createOrder: function(data, actions) {
      // Set up the transaction
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: document.getElementById('amount').value,
            currency_code: document.getElementById('currency').value
          },
          description: document.getElementById('description').value
        }]
      });
    },
    onApprove: function(data, actions) {
      // Capture the funds from the transaction
      return actions.order.capture().then(function(details) {
        // Show a success message to the buyer
        alert('Transaction completed by ' + details.payer.name.given_name + '!');
      });
    }
  }).render('#paypal-button-container'); 