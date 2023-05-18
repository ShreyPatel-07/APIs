const apiKey = 'YOUR API KEY';
const timeZoneUrl = 'https://timezone.abstractapi.com/v1/current_time/';

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

const validateTimeZone = () => {
  const location = document.querySelector('#location-input').value.trim();
  if (!location) {
    document.querySelector('#validation-result').innerHTML = 'Please enter a location.';
    return;
  }

  const url = `${timeZoneUrl}?api_key=${apiKey}&location=${encodeURIComponent(location)}`;
  httpGetAsync(url, (response) => {
    const data = JSON.parse(response);
	console.log(data);
    if (data.error) {
      document.querySelector('#validation-result').innerHTML = data.error;
    } else {
      const message = `The time zone for ${location} is ${data.datetime}.`;
      document.querySelector('#validation-result').innerHTML = message;
    }
  });
};

document.querySelector('#validate-btn').addEventListener('click', validateTimeZone);
