import appConfig from '../appconfig/config.json' assert {type: 'json'};
const apiEndpoint = appConfig.api;

async function deleteProduct(id) {
	// ask user if they are sure they want to delete the record, return if they don't
	if (!confirm('Are you sure you want to delete this record?')) return;

	// Try and delete the product by id
	const response = await fetch(apiEndpoint + '/' + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
	});
	const data = await response.json();
	console.log(data);
	window.location.reload();
}

async function loadIntoTable(url, table) {
	const tableHead = table.querySelector('thead');
	const tableBody = table.querySelector('tbody');
	const response = await fetch(url);
	const data = await response.json();

	// Clear table
	tableHead.innerHTML = '<tr></tr>';
	tableBody.innerHTML = '';

	// If no data comes back from fetch then log to console and return
	if (data.length === 0) {
		const nodataInfo = document.createElement('div');
		nodataInfo.textContent = 'No data found, try creating a new product!';
		nodataInfo.setAttribute('role', 'alert');
		nodataInfo.setAttribute('class', 'alert alert-warning');	

		const tableObj = document.getElementById('prodtable');

		tableObj.parentNode.insertBefore(nodataInfo, tableObj);
		return;
	}

	// Populate the header
	for (const headerText of Object.keys(data[0])) {
		const headerElement = document.createElement('th');

		headerElement.textContent = headerText;
		tableHead.querySelector('tr').appendChild(headerElement);
	}
	// add th for actions
	const headerElement = document.createElement('th');
	headerElement.textContent = 'Actions';
	tableHead.querySelector('tr').appendChild(headerElement);


	// Populate the rows
	for (const row of data) {
		const rowElement = document.createElement('tr');
		// create Edit button
		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.setAttribute('type', 'button');
		editButton.setAttribute('class', 'btn btn-secondary m-1');

		// create Delete button
		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.setAttribute('type', 'button');
		deleteButton.setAttribute('class', 'btn btn-danger m-1');

		// Add values from row to table
		for (const cell of Object.values(row)) {
			const cellElement = document.createElement('td');

			cellElement.textContent = cell;
			rowElement.appendChild(cellElement);

			// Get the key from the key/value pair
			const key = Object.keys(row)[Object.values(row).indexOf(cell)];


			// create event listeners
			if (key === 'id') {
				// add event listener to the delete button based on the key
				deleteButton.addEventListener('click', function(e) {
					e.preventDefault();
					deleteProduct(cell);
				});

				// Add event listener to the edit button based on the key
				// if the user clicks the edit button, then load the edit page
				editButton.addEventListener('click', function(e) {
					e.preventDefault();
					window.location.href = '/edit?id=' + cell;
				});

			}


		}

		// Create button TD
		const buttonTd = document.createElement('td');
		rowElement.appendChild(buttonTd);

		// add buttons to the td
		buttonTd.appendChild(editButton);
		buttonTd.appendChild(deleteButton);

		// add row to table
		tableBody.appendChild(rowElement);
	}

}


loadIntoTable(apiEndpoint, document.querySelector('table'));