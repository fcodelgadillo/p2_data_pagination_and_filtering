/*********************************************
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
**********************************************/

// DOM selectors

let studentList = document.querySelector(".student-list"); // This is the selector of UL that contains student info
let linkList = document.querySelector(".link-list") // This is the selector of the UL that will represent the pages needed
let header = document.querySelector(".header"); // This is the selector of the header, the one that we will use in the search bar

// Declaration of one constant to avoid "hard code"

const studentsPerPage = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
    let startIndex = (page*studentsPerPage)-studentsPerPage;
    let endIndex = page*studentsPerPage;

    studentList.innerHTML = '';

    for (let i = 0; i < list.length; i += 1) {
        if (i >= startIndex && i < endIndex) {

           studentList.insertAdjacentHTML('beforeend', `<li class="student-item cf">
    <div class="student-details">
      <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
      <h3>${list[i].name.first} ${list[i].name.last}</h3>
      <span class="email">${list[i].email}</span>
    </div>
    <div class="joined-details">
      <span class="date">Joined ${list[i].registered.date}</span>
    </div>
  </li>`);
        }
    }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination (list) {
    const pagesNeeded = Math.ceil(list.length/studentsPerPage);
    linkList.innerHTML = '';

    for (let i = 1; i <= pagesNeeded; i += 1) {

        linkList.insertAdjacentHTML("beforeend", `<li>
   <button type="button">${i}</button>
 </li>`);

        document.querySelector("button").className = "active";
    }

    linkList.addEventListener('click', (e) => {
        let eventTarget = e.target;
        if (eventTarget.tagName === 'BUTTON') {
            document.querySelector(".active").className = "";
            eventTarget.className = "active";
            showPage(list, eventTarget.textContent);
        }
    });
}


//Add a search-bar

header.insertAdjacentHTML("beforeend", `<label for="search" class="student-search">
        <input id="search" placeholder="Search by name...">
        <button type="button"><img src="icn-search.svg" alt="Search icon"></button>
  </label>`);

// Selectors for search-bar and input

const search = document.querySelector('#search');
const searchLabel = document.querySelector('.student-search');
const searchButton = searchLabel.querySelector('[type="button"]');


// function creation for the search-bar

function searchBar(input, students) {
    studentList.innerHTML = "";
    linkList.innerHTML = "";

    let newArray = [];


    students.forEach(function (student) {

        // If there is no input, call the initial functions
        if (input.value.length === 0) {
            showPage(data, 1);
            addPagination(data);
        }

        // Checks if there's an input
        else if (input.value.length !== 0 &&
            ((student.name.first.toLowerCase().includes(input.value.toLowerCase())) ||
                (student.name.last.toLowerCase().includes(input.value.toLowerCase())))) {
            newArray.push(student);
            showPage(newArray, 1)
            addPagination(newArray);
        }
    });

    if (input.value.length !== 0 && newArray.length === 0) {
        studentList.innerHTML = "";
        studentList.insertAdjacentHTML("beforeend", '<h2>No results found</h2>');
    }
}

// Event listeners for search-bar functionality

searchButton.addEventListener('click', () => {
    searchBar(search, data);
});

search.addEventListener('keyup', (e) => {
    e.preventDefault();
    searchBar(search, data);
});


// Call functions

showPage(data, 1);
addPagination(data);
