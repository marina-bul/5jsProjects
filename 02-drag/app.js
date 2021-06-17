const placeholders = document.querySelectorAll(".placeholder");
const listToBuy = document.querySelector(".to-buy");
const newItemArea = document.querySelector(".new-item");
const addItem = document.querySelector(".add-item");

let items;
let currentElement;

addItem.addEventListener("submit", addItemToList);

updateItems();

for (const placeholder of placeholders) {
  placeholder.addEventListener("dragover", dragover);
  placeholder.addEventListener("dragenter", dragenter);
  placeholder.addEventListener("dragleave", dragleave);
  placeholder.addEventListener("drop", dragdrop);
}

function dragstart(e) {
  currentElement = e.target;
  e.target.classList.add("hold");
  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);
}

function dragend(e) {
  e.target.classList.remove("hold", "hide");
}

function dragover(e) {
  e.preventDefault();
}

function dragenter(e) {
  e.target.classList.add("hovered");
}

function dragleave(e) {
  e.target.classList.remove("hovered");
}

function dragdrop(e) {
  e.target.classList.remove("hovered");
  if (e.target.classList.contains("placeholder")) {
    e.target.append(currentElement);
  }
}

function addItemToList(e) {
  e.preventDefault();
  let newItem = `<li class="item" draggable="true">${newItemArea.value}</li>`;
  listToBuy.insertAdjacentHTML("beforeend", newItem);
  newItemArea.value = "";
  updateItems();
}

function updateItems() {
  items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("dragstart", dragstart);
    item.addEventListener("dragend", dragend);
  });
}
