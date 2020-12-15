const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

const URL = `https://randomuser.me/api`;
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random User & add money
async function getRandomUser() {
  const res = await fetch(URL);
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
    picture: `${user.picture.thumbnail}`
  };

  addData(newUser);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

  providedData.forEach(person => {
    const div = document.createElement("div");
    div.classList.add("person");
    div.innerHTML = `
      <img src=${person.picture} alt="${person.name}'s profile picture" />
      <strong>${person.name}</strong> ${formatMoney(person.money)}`;
    main.appendChild(div);
  });
}

// Format number as money
function formatMoney(num) {
  return `$${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
