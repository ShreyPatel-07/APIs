const apiKey = 'YOUR API KEY';
const phoneValidationUrl = 'https://phonevalidation.abstractapi.com/v1/';

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

const validatePhone = () => {
  const phoneInput = document.querySelector('#phone-input').value.trim();
  if (!phoneInput) {
    document.querySelector('#validation-result').innerHTML = 'Please enter at least one phone number.';
    return;
  }

  const phoneNumbers = phoneInput.split(',');
  const messages = [];

  phoneNumbers.forEach((phone) => {
    const url = `${phoneValidationUrl}?api_key=${apiKey}&phone=${phone.trim()}`;
    httpGetAsync(url, (response) => {
      const data = JSON.parse(response);
      console.log(data);
      const result = data.valid ? 'valid' : 'invalid';
      const message = `The phone number ${phone} is ${result}.`;
      messages.push(message);

      if (messages.length === phoneNumbers.length) {
        document.querySelector('#validation-result').innerHTML = messages.join('<br>');
      }
    });
  });
};

document.querySelector('#validate-btn').addEventListener('click', validatePhone);
