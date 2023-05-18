const apiKey = 'YOUR_API_KEY';

function translate() {
	const text = document.getElementById('text').value;
	const select = document.getElementById('select').value;
	const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${text}&target=${select}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			const translation = data.data.translations[0].translatedText;
			document.getElementById('result').innerHTML = translation;
		})
		.catch(error => console.error(error));
}
