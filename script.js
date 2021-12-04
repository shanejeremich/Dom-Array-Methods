const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

// Testing user on Udemy's code
// const container = document.querySelector(".container");
// container.addEventListener("click", e => {
//   if (e.target.className === "show") {
//     let temp = data.filter(user => user.money > 1000000);
//     updateDOM(temp);
//   } else {
//     updateDOM();
//   }

//   if (e.target.classList.contains("show")) {
//     e.target.classList.toggle("dont");
//   }
// });

const URL = `https://randomuser.me/api`;
const CORS = { headers: { "Access-Control-Allow-Origin": "*" } };
let data = [];
let tempArr = [];
let counter = 0;
let tempCount = 0;
let toggle = false;

getRandomUser();
getRandomUser();

// Fetch random User & add money
async function getRandomUser() {
  const res = await fetch(URL, CORS);
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
    picture: `${user.picture.thumbnail}`
  };

  addData(newUser);
}

// Double Everyone's money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter only Millionaires
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

function showMillionaires() {
  let temp = data;
  if (!toggle && tempCount === 0) {
    temp = temp.filter(user => user.money >= 1000000);
    tempArr.push(temp);
    updateDOM(temp);
    toggle = true;
    tempCount++;
  } else {
    updateDOM();
    tempArr = [];
    tempCount = 0;
    toggle = false;
  }
}

// Calculate the total wealth

// Testing user on Udemy's code
// function calculateWealth() {
//   const wealth = data.reduce((acc, user) => (acc += user.money), 0);
//   const wealthEl = document.createElement("div");
//   wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
//   main.appendChild(wealthEl);
// }

function calculateWealth() {
  if (counter === 0 && tempArr.length > 0) {
    const wealth = tempArr[0].reduce((acc, curr) => acc + curr.money, 0);
    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
    counter = 1;
  } else if (counter === 0) {
    const wealth = data.reduce((acc, curr) => acc + curr.money, 0);
    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
    counter = 1;
  }
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
  return (counter = 0);
}

// Format number as money
function formatMoney(num) {
  return `$${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
