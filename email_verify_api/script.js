const apiKey = 'YOUR API KEY';
const emailValidationUrl = 'https://emailvalidation.abstractapi.com/v1/';

function httpGetAsync(url, callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

const validateEmail = (email, callback) => {
  if (!email) {
    callback('Please enter an email address.', null);
    return;
  }

  const url = `${emailValidationUrl}?api_key=${apiKey}&email=${email}`;
  httpGetAsync(url, (response) => {
    const data = JSON.parse(response);
    console.log(data)
    const result = data.is_valid_format ? 'valid' : 'invalid';
    const message = data.deliverability;
    callback(null, { email, result, message });
  });
};

const validateEmails = () => {
  const emails = document.querySelector('#email-input').value.trim().split(',');
  if (!emails) {
    document.querySelector('#validation-result').innerHTML = 'Please enter email addresses.';
    return;
  }

  const table = document.createElement('table');
  const header = table.createTHead();
  const row = header.insertRow(0);
  const emailCell = row.insertCell(0);
  const resultCell = row.insertCell(1);
  const messageCell = row.insertCell(2);
  emailCell.innerHTML = 'Email';
  resultCell.innerHTML = 'Result';
  messageCell.innerHTML = 'Message';

  const tbody = table.createTBody();
  for (let i = 0; i < emails.length; i++) {
    const email = emails[i].trim();
    validateEmail(email, (err, data) => {
      const row = tbody.insertRow();
      const emailCell = row.insertCell(0);
      const resultCell = row.insertCell(1);
      const messageCell = row.insertCell(2);
      emailCell.innerHTML = data.email;
      resultCell.innerHTML = data.result;
      messageCell.innerHTML = data.message;
    });
  }

  document.querySelector('#validation-result').innerHTML = '';
  document.querySelector('#validation-result').appendChild(table);
};

document.querySelector('#validate-btn').addEventListener('click', validateEmails);
