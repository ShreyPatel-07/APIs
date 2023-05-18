const form = document.querySelector('form');
const result = document.getElementById('result');

form.addEventListener('submit', event => {
  event.preventDefault();
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('from-currency').value;
  const toCurrency = document.getElementById('to-currency').value;

  const endpoint = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const conversionRate = data.rates[toCurrency];
      const convertedAmount = amount * conversionRate;
      result.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    })
    .catch(error => console.error(error));
});