function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "YOUR API KEY";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const weather = data.weather[0].description;
      const temp = data.main.temp;
      const feelsLike = data.main.feels_like;
      const result = document.getElementById("result");
      result.innerHTML = `
        <h2>${city} Weather</h2>
        <p>Current weather: ${weather}</p>
        <p>Temperature: ${temp} &#8451;</p>
        <p>Feels like: ${feelsLike} &#8451;</p>
      `;
    })
    .catch(error => {
      console.error(error);
    });
}
