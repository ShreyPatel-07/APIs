const apiKey = 'YOUR API KEY';
const vatValidationUrl = 'https://vat.abstractapi.com/v1/validate/';

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

const validateVat = () => {
  const vatNumber = document.querySelector('#vat-input').value.trim();
  if (!vatNumber) {
    document.querySelector('#validation-result').innerHTML = 'Please enter a VAT number.';
    return;
  }

  const url = `${vatValidationUrl}?api_key=${apiKey}&vat_number=${vatNumber}`;
  httpGetAsync(url, (response) => {
    const data = JSON.parse(response);
    const result = data.valid ? 'valid' : 'invalid';
    console.log(data);
    const message = `The VAT number ${vatNumber} is ${result}.`;
    document.querySelector('#validation-result').innerHTML = message;
  });
};

document.querySelector('#validate-btn').addEventListener('click', validateVat);
