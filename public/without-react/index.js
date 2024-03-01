let firstName = 'Jane';
let lastName = 'Jacobs';
let isEditing = false;

const handleFormSubmit = e => { e.preventDefault(); setIsEditing(!isEditing); }
const handleFirstNameChange = e => setFirstName(e.target.value);
const handleLastNameChange = e => setLastName(e.target.value);

const setFirstName = value => { firstName = value; updateDOM(); }
const setLastName = value => { lastName = value; updateDOM(); }
const setIsEditing = value => { isEditing = value; updateDOM(); }

const hide = el => el.style.display = 'none';
const show = el => el.style.display = '';

const form = document.getElementById('form');
const editButton = document.getElementById('editButton');
const firstNameInput = document.getElementById('firstNameInput');
const firstNameText = document.getElementById('firstNameText');
const lastNameInput = document.getElementById('lastNameInput');
const lastNameText = document.getElementById('lastNameText');
const helloText = document.getElementById('helloText');

form.onsubmit = handleFormSubmit;
firstNameInput.oninput = handleFirstNameChange;
lastNameInput.oninput = handleLastNameChange;

function updateDOM() {
    if (isEditing) {
        editButton.textContent = 'Save Profile';
        show(firstNameInput);
        show(lastNameInput);
        hide(firstNameText);
        hide(lastNameText);
    } else {
        editButton.textContent = 'Edit Profile';
        hide(firstNameInput);
        hide(lastNameInput);
        show(firstNameText);
        show(lastNameText);
    }

    firstNameText.textContent = firstName;
    lastNameText.textContent = lastName;
    helloText.textContent = `Hello, ${firstName} ${lastName}!`;
}
