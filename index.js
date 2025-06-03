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

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    choreCard.innerHTML = "";
    editChore(chore, choreCard);
  });

  isDone.append(checkbox);
  choreCard.append(name, priority, isDone, editBtn);
  assignedDay.append(choreCard);
}

function editChore(chore, choreCard) {
  const editForm = document.createElement("form");

  const addSelectOptions = (parentSelect, options) => {
    options.forEach((element) => {
      const option = document.createElement("option");
      option.textContent = element;
      option.value = element;
      parentSelect.append(option);
    });
  };

  const editName = document.createElement("input");
  editName.value = chore.name;

  const editDay = document.createElement("select");
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  addSelectOptions(editDay, days);
  editDay.value = chore.day;

  const editPriority = document.createElement("select");
  const priorities = ["Very High", "High", "Medium", "Low", "Very Low"];
  addSelectOptions(editPriority, priorities);
  editPriority.value = chore.priority;

  const saveBtn = document.createElement("button");
  saveBtn.type = "submit";
  saveBtn.textContent = "Save";

  editForm.append(editName, editDay, editPriority, saveBtn);
  choreCard.append(editForm);

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const updatedChore = {
      name: editName.value,
      day: editDay.value,
      priority: editPriority.value
    }

    choreCard.remove();
    displayChore(updatedChore);
  })
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
