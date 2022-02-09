const form = document.getElementById('formData');
let update = false;
let updateId = '';

const firstName = form.elements['firstName'];
const lastName = form.elements['lastName'];
const companyName = form.elements['companyName'];
const address = form.elements['address'];
const email = form.elements['email'];
const phone = form.elements['phone'];
const additionalInfo = form.elements['addInfo'];

const FIRST_NAME_REQUIRED = 'Please enter firstname';
const LAST_NAME_REQUIRED = 'Please enter lastname';
const COMPANY_NAME_REQUIRED = 'Please enter company name';
const ADDRESS_REQUIRED = 'Please enter address';
const EMAIL_REQUIRED = 'Please enter email';
const PHONE_REQUIRED = 'Please enter phone';
const INFO_REQUIRED = 'Please enter info';

function uniqueId() {
  return Math.random().toString(16).slice(2);
}

function showMessage(input, message, type) {
  const msg = input.parentNode.querySelector('p');
  msg.innerText = message;
  msg.setAttribute('class', 'text-danger');
  // type
  //   ? input.setAttribute("class", "is-valid form-control")
  //   : input.setAttribute("class", "is-invalid form-control");
  return type;
}

function showError(input, message) {
  return showMessage(input, message, false);
}

function showSuccess(input) {
  return showMessage(input, '', true);
}

function hasValue(input, message) {
  if (input.value.trim() === '') {
    return showError(input, message);
  }
  return showSuccess(input);
}

function saveToLocalStorage(dataToSave) {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  users.push(dataToSave);
  localStorage.setItem('users', JSON.stringify(users));
}

function updateInLocalStorage(dataToUpdate) {
  let users = JSON.parse(localStorage.getItem('users'));
  let usersToSaveAgain = users.filter((user) => user.id !== dataToUpdate.id);
  usersToSaveAgain.push(dataToUpdate);
  localStorage.setItem('users', JSON.stringify(usersToSaveAgain));
}

function showLocalStorageData() {
  if (localStorage.getItem('users') !== null) {
    let users = JSON.parse(localStorage.getItem('users'));
    let userCards = document.getElementById('userCards');
    userCards.innerHTML = '';
    users.map((user) => {
      let div = document.createElement('div');
      div.setAttribute('class', 'card m-3');
      div.setAttribute('id', `${user.id}`);
      div.style.width = '18rem';

      let ul = document.createElement('ul');
      ul.setAttribute('class', 'list-group list-group-flush');

      let liOne = document.createElement('li');
      liOne.setAttribute('class', 'list-group-item');
      liOne.textContent = `Name: ${user.firstName} ${user.lastName}`;

      let liTwo = document.createElement('li');
      liTwo.setAttribute('class', 'list-group-item');
      liTwo.textContent = `Address: ${user.address}`;

      let liThree = document.createElement('li');
      liThree.setAttribute('class', 'list-group-item');
      liThree.textContent = `CompanyName: ${user.companyName}`;

      let liFour = document.createElement('li');
      liFour.setAttribute('class', 'list-group-item');
      liFour.textContent = `Email: ${user.email}`;

      let liFive = document.createElement('li');
      liFive.setAttribute('class', 'list-group-item');
      liFive.textContent = `Phone: ${user.phone}`;

      let updateButton = document.createElement('button');
      updateButton.setAttribute('class', 'btn btn-info m-1');
      updateButton.textContent = 'Update';
      updateButton.onclick = () => updateUser(user.id);

      let deleteButton = document.createElement('button');
      deleteButton.setAttribute('class', 'btn btn-danger m-1');
      deleteButton.textContent = 'Delete';
      // deleteButton.onclick = () => deleteUser(user.id);
      document.getElementById('deleteUserButton').onclick = () =>
        deleteUser(user.id);
      console.log(user.id);
      deleteButton.setAttribute('data-bs-toggle', 'modal');
      deleteButton.setAttribute('data-bs-target', '#staticBackdrop');

      ul.appendChild(liOne);
      ul.appendChild(liTwo);
      ul.appendChild(liThree);
      ul.appendChild(liFour);
      ul.appendChild(liFive);
      ul.appendChild(updateButton);
      ul.appendChild(deleteButton);

      div.appendChild(ul);

      userCards.appendChild(div);
    });
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let formData;

  let firstNameValid = hasValue(firstName, FIRST_NAME_REQUIRED);
  let lastNameValid = hasValue(lastName, LAST_NAME_REQUIRED);
  let companyNameValid = hasValue(companyName, COMPANY_NAME_REQUIRED);
  let addressValid = hasValue(address, ADDRESS_REQUIRED);
  let emailValid = hasValue(email, EMAIL_REQUIRED);
  let phoneValid = hasValue(phone, PHONE_REQUIRED);
  let addInforValid = hasValue(additionalInfo, INFO_REQUIRED);

  if (
    firstNameValid &&
    lastNameValid &&
    companyNameValid &&
    addressValid &&
    email &&
    emailValid &&
    phoneValid &&
    addInforValid
  ) {
    formData = {
      id: update ? updateId : uniqueId(),
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      companyName: companyName.value,
      address: address.value,
      additionalInfo: additionalInfo.value,
    };
    console.log(formData);
    if (update) {
      updateInLocalStorage(formData);
    } else {
      saveToLocalStorage(formData);
    }
    update = false;
    showLocalStorageData();
    resetForm();
  }
});

function resetForm() {
  firstName.value = '';
  lastName.value = '';
  companyName.value = '';
  address.value = '';
  email.value = '';
  phone.value = '';
  additionalInfo.value = '';

  document.getElementById('submit').textContent = 'Save user';
}

function updateUser(id) {
  let users = JSON.parse(localStorage.getItem('users'));
  let userToUpdate = users.filter((user) => user.id === id)[0];
  updateId = userToUpdate.id;
  firstName.value = userToUpdate.firstName;
  lastName.value = userToUpdate.lastName;
  email.value = userToUpdate.email;
  companyName.value = userToUpdate.companyName;
  address.value = userToUpdate.address;
  phone.value = userToUpdate.phone;
  additionalInfo.value = userToUpdate.additionalInfo;

  update = true;
  document.getElementById('submit').textContent = 'Update User';
}

function deleteUser(id) {
  let users = JSON.parse(localStorage.getItem('users'));
  let usersToSaveAgain = users.filter((user) => user.id !== id);
  localStorage.setItem('users', JSON.stringify(usersToSaveAgain));
  showLocalStorageData();
}

showLocalStorageData();