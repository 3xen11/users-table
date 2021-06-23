import './styles/styles.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

const tableStart =
  `<table class="table table-dark">
       <thead class="thead-dark">
         <tr>
           <th class="col-6">Number of users</th>
           <th class="col-6">Company name</th>
         </tr>
       </thead>
       <tbody>`;

const tableEnd =
  `  </tbody>
    </table>`;

let usersArray = [];
let companiesArray = [];

window.onload = () => {
  fetch('../db.json')
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      return data;
    })
    .then(function (data) {
      arrayBreaks(data);
    })
    .then(function () {
      finalArrayCreator();
      finalArraySorting();
    })
    .then(function () {
      tableGenerating();
    });
};


//! FUNKCJE W FETCHU
//* rozbicie na tablice
const arrayBreaks = (data) => {
  for (let i = 0; i < data.users.length; i++) {
    let names = data.users[i].name;
    let emails = data.users[i].email;
    let companies = data.users[i].uris.company.slice(11, data.users.length);
    usersArray.push({
      name: names,
      email: emails,
      companyNumber: companies
    });
  }
  for (let i = 0; i < data.companies.length; i++) {
    companiesArray.push({
      name: data.companies[i].name,
      users: []
    });
  }
};

//* stworzenie 'finalnej' tablicy
const finalArrayCreator = () => {
  for (let i = 0; i < usersArray.length; i++) {
    const companyNumberSliced = usersArray[i].companyNumber;
    const userName = usersArray[i].name;
    const userEmail = usersArray[i].email;
    companiesArray[companyNumberSliced].users.push({
      userName,
      userEmail
    });
  }
};

//* posortownie 'finalnej' tablicy po ilości użytkowników
const finalArraySorting = () => {
  companiesArray.sort((a, b) => {
    const listOne = a.users.length;
    const listTwo = b.users.length;
    if (listOne < listTwo) {
      return 1;
    } else if (listOne > listTwo) {
      return -1;
    }
    return 0;
  });
};

//* generowanie tabeli
const tableGenerating = () => {
  let tableContent = tableStart;
  for (let i = 0; i < companiesArray.length; i++) {
    tableContent +=
      `<tr class="table-success">
                    <td class="fw-bold"> ${companiesArray[i].users.length} users</td>
                    <td class="fw-bold">${companiesArray[i].name}</td>
               </tr>`;
    for (let j = 0; j < companiesArray[i].users.length; j++) {
      tableContent +=
        `<tr>
                    <td >${companiesArray[i].users[j].userName}</td>
                    <td colspan="2">${companiesArray[i].users[j].userEmail}</td>
                 </tr>`;
    }
  }
  tableContent += tableEnd;
  document.querySelector('.companies-table').innerHTML = tableContent;
};

//! KONIEC FUNKCJI W FETCHU