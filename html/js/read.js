import appConfig from '../appconfig/config.json' with {type: 'json'};
const apiEndpoint = appConfig.api;
const frontendEndpoint = appConfig.frontend;

async function deleteProduct(id) {
	// ask user if they are sure they want to delete the record, return if they don't
	if (!confirm('Are you sure you want to delete this record?')) return;

	try {
		// Try and delete the product by id
		const response = await fetch(`${apiEndpoint}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		console.log(data);
		window.location.reload();
	} catch (err) {
		console.error('Error deleting product:', err);
	}
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
		// Only display products with price <= 100.00
		if (parseFloat(row.price) > 100.00) {
			continue;
		}

		const rowElement = document.createElement('tr');
		// create View Deal link
		const viewDealLink = document.createElement('a');
		viewDealLink.textContent = 'View Deal';
		viewDealLink.setAttribute('href', `${frontendEndpoint}`);
		viewDealLink.setAttribute('class', 'btn btn-primary m-1');
		viewDealLink.setAttribute('target', '_blank');

		// Add values from row to table
		for (const cell of Object.values(row)) {
			const cellElement = document.createElement('td');

			cellElement.textContent = cell;
			rowElement.appendChild(cellElement);
		}

		// Create button TD
		const buttonTd = document.createElement('td');
		rowElement.appendChild(buttonTd);

		// add link to the td
		buttonTd.appendChild(viewDealLink);

		// add row to table
		tableBody.appendChild(rowElement);
	}

}


loadIntoTable(apiEndpoint, document.querySelector('table'));