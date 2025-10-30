const myForm = document.getElementById('createProduct');
import appConfig from '../appconfig/config.json' assert {type: 'json'};
const apiEndpoint = appConfig.api;

myForm.addEventListener('submit', function(e) {
	// Prevent the default behavior of the form
	e.preventDefault();

	// Store payload in a variable
	const payload = new FormData(myForm);

	// convert payload to json
	var obj = {};
	payload.forEach((value, key) => obj[key] = value);
	//var jsonPayload = JSON.stringify(obj);
	var jsonPayload = JSON.stringify({
		"name": obj.name,
		"price": Number(obj.price),
		"description": obj.description,
	});

	// Use fetch to send the payload to the server
	fetch(apiEndpoint, { 
		method: 'POST',
		body: jsonPayload,
		headers: {
			'Content-Type': 'application/json'
		},

	})
		.then(res => res.json())
		.then(data => console.log(data))
		.then(
			//window.location.href = '/'
			function disp_alert(){
				//if (confirm("Successfully created listing!")) window.location = "/";
				alert("Successfully created listing!");
				window.location.href = '/'
			}
		)
		.catch(err => console.log(err));
})