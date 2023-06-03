//create an array
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// Function to add a new contact
function addContact(event) {
    event.preventDefault();

    //input values
    const name = document.getElementById('nameInput').value;
    const mobileNumber = document.getElementById('mobileInput').value;
//create object
    const contact = {
        name: name,
        mobileNumber: mobileNumber
    };
    contacts.push(contact);
    //empty input fields
    document.getElementById('nameInput').value = '';
    document.getElementById('mobileInput').value = '';

    // Update localStorage
    localStorage.setItem('contacts', JSON.stringify(contacts));

//updated contacts
    displayContacts();
}

// delete a contact
function deleteContact(index) {
    contacts.splice(index, 1);
    displayContacts();
    // Update localStorage
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// update a contact
function updateContact(index) {
    const nameInput = document.getElementById(`nameInput_${index}`);
    const mobileInput = document.getElementById(`mobileInput_${index}`);
    const updateButton = document.getElementById(`updateButton_${index}`);

    if (updateButton.textContent === 'Update') {
        nameInput.disabled = false;
        mobileInput.disabled = false;
        nameInput.focus();
        updateButton.textContent = 'Update & Save';
    } else {
        const newName = nameInput.value;
        const newMobileNumber = mobileInput.value;

        contacts[index].name = newName;
        contacts[index].mobileNumber = newMobileNumber;

        // Disable editing mode
        nameInput.disabled = true;
        mobileInput.disabled = true;
        updateButton.textContent = 'Update';

        displayContacts();
    }

     // Update localStorage
     localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Function to display the contacts
function displayContacts() {
    const contactTable = document.getElementById('contactTable');
    const tbody = contactTable.querySelector('tbody');

    // Clear existing table rows
    tbody.innerHTML = '';

    // Iterate over the contacts array and add rows to the table
    contacts.forEach((contact, index) => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const mobileCell = document.createElement('td');
        const updateCell = document.createElement('td');
        const deleteCell = document.createElement('td');
        const nameInput = document.createElement('input');
        const mobileInput = document.createElement('input');
        const updateButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('id', `nameInput_${index}`);
        nameInput.setAttribute('value', contact.name);
        nameInput.disabled = true;

        mobileInput.setAttribute('type', 'text');
        mobileInput.setAttribute('id', `mobileInput_${index}`);
        mobileInput.setAttribute('value', contact.mobileNumber);
        mobileInput.disabled = true;

        updateButton.textContent = 'Update';
        updateButton.setAttribute('id', `updateButton_${index}`);
        updateButton.addEventListener('click', () => updateContact(index));

        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteContact(index));

        nameCell.appendChild(nameInput);
        mobileCell.appendChild(mobileInput);
        updateCell.appendChild(updateButton);
        deleteCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(mobileCell);
        row.appendChild(updateCell);
        row.appendChild(deleteCell);

        tbody.appendChild(row);
    });
}

// event listener
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', addContact);

// Display the initial contacts
displayContacts();