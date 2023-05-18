function httpGetAsync(url, callback) {
	const xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
			callback(xmlHttp.responseText);
	}
	xmlHttp.open("GET", url, true); // true for asynchronous
	xmlHttp.send(null);
}

function getGeolocation() {
	const ip = document.getElementById("ip").value;
	const apiKey = "YOUR API KEY";
	const url = "https://ipgeolocation.abstractapi.com/v1/?api_key=" + apiKey + "&ip_address=" + ip;
	
	httpGetAsync(url, function(response) {
		const data = JSON.parse(response);
		
		document.getElementById("city").textContent = data.city;
		document.getElementById("region").textContent = data.region;
		document.getElementById("country").textContent = data.country;
		document.getElementById("latitude").textContent = data.latitude;
		document.getElementById("longitude").textContent = data.longitude;
	});
}
