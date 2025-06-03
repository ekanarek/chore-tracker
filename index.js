const choresUrl = "http://localhost:3000/chores/";
const newChoreForm = document.querySelector("#new-chore-form");

newChoreForm.reset();
fetchChores();

function fetchChores() {
  fetch(choresUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((chore) => {
        displayChore(chore);
      });
    });
}

function displayChore(chore) {
  const assignedDay = document.querySelector(`div#${chore.day}`);

  const choreCard = document.createElement("div");
  choreCard.className = "card";

  const name = document.createElement("h5");
  name.className = "card-title";
  name.textContent = chore.name;

  const priority = document.createElement("p");
  priority.textContent = `Priority: ${chore.priority}`;

  const isDone = document.createElement("label");
  isDone.for = chore.id;
  isDone.textContent = "Done? ";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = chore.id;

  isDone.append(checkbox);
  choreCard.append(name, priority, isDone);
  assignedDay.append(choreCard);
}

newChoreForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.querySelector("#nameInput").value;
  const dayInput = document.querySelector("#dayInput").value;
  const priorityInput = document.querySelector("#priorityInput").value;

  const newChore = {
    name: nameInput,
    day: dayInput,
    priority: priorityInput,
  };

  displayChore(newChore);
  newChoreForm.reset();
});
