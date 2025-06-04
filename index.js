const choresUrl = "http://localhost:3000/chores/";
const newChoreForm = document.querySelector("#new-chore-form");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

newChoreForm.reset();
fetchChores();

function fetchChores() {
  fetch(choresUrl)
    .then((response) => response.json())
    .then((data) => {
      const currentCards = document.querySelectorAll(".card");
      currentCards.forEach((card) => card.remove());

      days.forEach((day) => {
        const choresForDay = data.filter((chore) => chore.day === day);

        choresForDay.sort((a, b) => {
          const priorityMap = {
            "Very High": 5,
            High: 4,
            Medium: 3,
            Low: 2,
            "Very Low": 1,
          };

          if (a.completed !== b.completed) {
            return a.completed - b.completed;
          }

          return priorityMap[b.priority] - priorityMap[a.priority];
        });

        choresForDay.forEach((chore) => displayChore(chore));
      });
    });
}

function displayChore(chore) {
  const assignedDay = document.querySelector(`div#${chore.day}`);

  const choreCard = document.createElement("div");
  choreCard.className = `card mb-2 p-2 shadow-sm ${
    chore.completed ? "text-muted bg-light" : ""
  }`;

  const name = document.createElement("h5");
  name.className = "card-title";
  name.textContent = chore.name;

  const priority = document.createElement("p");
  priority.textContent = `Priority: ${chore.priority}`;
  priority.className = "card-subtitle mb-2 text-muted";

  const checkIfDone = document.createElement("label");
  checkIfDone.htmlFor = chore.id;
  checkIfDone.textContent = "Done?";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = chore.id;
  checkbox.className = "form-check-input ms-2";
  checkbox.checked = chore.completed;
  checkbox.addEventListener("change", () =>
    toggleComplete(chore, checkbox.checked)
  );

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-warning me-2";
  editBtn.textContent = "Edit";
  editBtn.disabled = checkbox.checked;
  editBtn.addEventListener("click", () => {
    choreCard.innerHTML = "";
    editChore(chore, choreCard);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-danger";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteChore(chore));

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "mt-2";
  buttonGroup.append(editBtn, deleteBtn);

  checkIfDone.append(checkbox);
  choreCard.append(name, priority, checkIfDone, buttonGroup);
  assignedDay.append(choreCard);
}

function toggleComplete(chore, isComplete) {
  fetch(choresUrl + chore.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ completed: isComplete }),
  })
    .then((response) => response.json())
    .then(() => fetchChores());
}

function editChore(chore, choreCard) {
  const editForm = document.createElement("form");
  editForm.className = "d-flex flex-column gap-2";

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
  editName.className = "form-control";
  editName.placeholder = "Chore name";

  const editDay = document.createElement("select");
  editDay.className = "form-select";
  addSelectOptions(editDay, days);
  editDay.value = chore.day;

  const editPriority = document.createElement("select");
  editPriority.className = "form-select";
  const priorities = ["Very High", "High", "Medium", "Low", "Very Low"];
  addSelectOptions(editPriority, priorities);
  editPriority.value = chore.priority;

  const saveBtn = document.createElement("button");
  saveBtn.type = "submit";
  saveBtn.textContent = "Save";
  saveBtn.className = "btn btn-success btn-sm";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancel";
  cancelBtn.className = "btn btn-secondary btn-sm ms-2";
  cancelBtn.addEventListener("click", () => fetchChores());

  const btnGroup = document.createElement("div");
  btnGroup.className = "mt-2";
  btnGroup.append(saveBtn, cancelBtn);

  editForm.append(editName, editDay, editPriority, btnGroup);
  choreCard.append(editForm);

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const updatedChore = {
      name: editName.value,
      day: editDay.value,
      priority: editPriority.value,
    };

    fetch(choresUrl + chore.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updatedChore),
    })
      .then((response) => response.json())
      .then(() => fetchChores());
  });
}

function deleteChore(chore) {
  fetch(choresUrl + chore.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => {
      fetchChores();
    });
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
    completed: false,
  };

  fetch(choresUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newChore),
  })
    .then((response) => response.json())
    .then(() => {
      fetchChores();
      newChoreForm.reset();
    });
});
