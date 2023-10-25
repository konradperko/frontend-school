// web API - window
  // DOM - Document Object Model
  // fetch - HTTP

const list = document.querySelector('ul');
const input = document.querySelector('input');
const select = document.querySelector('select');

let books = [];
let epochs = [];

fetchEpochs();
fetchBooks();

input.addEventListener('input', (event) => {
  generateList(input.value, select.value)
});

select.addEventListener('change', (event) => {
  generateList(input.value, select.value)
});

function fetchBooks() {
  fetch(`https://wolnelektury.pl/api/books`)
    .then((response) => {
      return response.json()
    })
    .then((body) => {
        books = body;
        generateList();
    })
}

function fetchEpochs() {
  fetch(`https://wolnelektury.pl/api/epochs`)
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        epochs = body.map((epoch) => epoch.name);
        generateOptions();
      })
}

function generateList(searchTitle = '', epochName = '') {
  list.innerHTML = '';
  books
    .filter((book) => book.title.toLowerCase().includes(searchTitle.toLowerCase()) || book.author.toLowerCase().includes(searchTitle.toLowerCase()))
    .filter((book) => book.epoch.includes(epochName))
    .forEach((book) => {
      const listEl = document.createElement("li");
      const bookTitle = document.createTextNode(`${book.title}: ${book.author}`);
      listEl.appendChild(bookTitle);
      list.appendChild(listEl);
    })
}

function generateOptions() {
  epochs
    .forEach((epoch) => {
      const optEl = document.createElement("option");
      const epochName = document.createTextNode(epoch);
      optEl.appendChild(epochName);
      select.appendChild(optEl);
    })
}
