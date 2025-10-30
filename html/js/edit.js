const myForm = document.getElementById('editProduct');
import appConfig from '../appconfig/config.json' assert {type: 'json'};
const apiEndpoint = appConfig.api;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id')

// populate the form with the product data using fetch
async function loadIntoForm(id) {
	const response = await fetch(apiEndpoint + '/' + id);
	const data = await response.json();
	myForm.elements.name.value = data.name;
	myForm.elements.price.value = data.price;
	myForm.elements.description.value = data.description;
}

//load into form
loadIntoForm(productId);

myForm.addEventListener('submit', function(e) {
	// Prevent the default behavior of the form
	e.preventDefault();

	fetch(apiEndpoint + '/' + productId, {
		method: 'PUT',
		headers: {

			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: myForm.querySelector('#name').value,
			price: Number(myForm.querySelector('#price').value),
			description: myForm.querySelector('#description').value
		})
	}).then(function(response) {
		return response.json();
	}).then(function(data) {
		console.log(data);
	}).then(
		function update_alert() {
			alert('Product updated successfully!');
			window.location.href = '/';
		}
	).catch(err => console.log(err));
})