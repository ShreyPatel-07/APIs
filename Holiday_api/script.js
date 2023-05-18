function httpGetAsync(url, callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

const form = document.getElementById("holidayForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const country = document.getElementById("country").value;
  const year = document.getElementById("year").value;
  const month = document.getElementById("month").value;
  const day = document.getElementById("day").value;

  const url = `https://holidays.abstractapi.com/v1/?api_key=YOUR API KEY &country=${country}&year=${year}&month=${month}&day=${day}`;

  httpGetAsync(url, function(response) {
    const holiday = JSON.parse(response);
    console.log(holiday);
    if (holiday.length > 0) {
      resultDiv.textContent = `It's ${holiday[0].name} in ${country}!`;
    } else {
      resultDiv.textContent = `No holiday in ${country} on ${year}-${month}-${day}.`;
    }
  });
});
