const apiKey = 'YOUR API KEY';
const ibanValidationUrl = 'https://ibanvalidation.abstractapi.com/v1/';

const httpGetAsync = (url, callback) => {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      callback(xmlHttp.responseText);
    }
  };
  xmlHttp.open('GET', url, true);
  xmlHttp.send(null);
};

const validateIban = () => {
  const iban = document.querySelector('#iban-input').value.trim();
  if (!iban) {
    document.querySelector('#validation-result').innerHTML = 'Please enter an IBAN.';
    return;
  }

  const url = `${ibanValidationUrl}?api_key=${apiKey}&iban=${iban}`;
  httpGetAsync(url, (response) => {
    const data = JSON.parse(response);
    console.log(data);
    const result = data.is_valid ? 'valid' : 'invalid';
    const message = `The IBAN ${iban} is ${result}.`;
    document.querySelector('#validation-result').innerHTML = message;
  });
};

document.querySelector('#validate-btn').addEventListener('click', validateIban);
