// ANIME VALIDATION
let checkTitle = () => {
  let titleInput = document.getElementById("inputTitle").value;
  let titleError = document.getElementById("errorTitle");
  if (titleInput === "") {
    titleError.style.display = "block";
    return false;
  } else {
    titleError.style.display = "none";
  }
};
document.getElementById("inputTitle").addEventListener("input", checkTitle);

// SEASON VALIDATION
const selectSeason = document.getElementById("seasonOptions");
const optionOrder = ["Winter", "Spring", "Summer", "Fall"];
let selectedOptions = [];
selectSeason.addEventListener("change", (event) => {
  const option = event.target.value;
  if (selectedOptions.includes(option)) {
    selectedOptions = selectedOptions.filter(
      (selectedOption) => selectedOption !== option
    );
  } else if (selectedOptions.length < 4) {
    selectedOptions.push(option);
    if (selectedOptions.length > 1) {
      const lastSelectedOption = selectedOptions.shift();
      const lastSelectedOptionIndex = optionOrder.indexOf(lastSelectedOption);
      const lastSelectedOptionElement =
        selectSeason.options[lastSelectedOptionIndex];
      lastSelectedOptionElement.selected = false;
    }
  }
});
let checkSeason = () => {
  let seasonInput = document.getElementById("seasonOptions").value;
  let seasonError = document.getElementById("errorSeason");
  if (seasonInput === "") {
    seasonError.style.display = "block";
    return false;
  } else {
    seasonError.style.display = "none";
    return true;
  }
};
document
  .getElementById("seasonOptions")
  .addEventListener("change", checkSeason);

// YEAR VALIDATION
const yearSelect = document.getElementById("yearSelect");
const errorYear = document.getElementById("yearError");
for (let year = 1970; year <= 2024; year++) {
  const option = document.createElement("option");
  option.value = year;
  option.text = year;
  yearSelect.add(option);
}
yearSelect.addEventListener("change", () => {
  if (yearSelect.value === "") {
    errorYear.style.display = "block";
  } else {
    errorYear.style.display = "none";
  }
});

// STATUS VALIDATION
const selectStatus = document.getElementById("statusOptions");
const optionOrderStatus = [
  "Plan to Watch",
  "Watching",
  "On Hold",
  "Completed",
  "Dropped",
];
let selectedStatus = [];
selectStatus.addEventListener("change", (event) => {
  const option = event.target.value;
  if (selectedStatus.includes(option)) {
    selectedStatus = selectedStatus.filter(
      (selectedOption) => selectedOption !== option
    );
  } else if (selectedStatus.length < 1) {
    selectedStatus.push(option);
    if (selectedStatus.length > 1) {
      const lastSelectedOption = selectedStatus.shift();
      const lastSelectedOptionIndex =
        optionOrderStatus.indexOf(lastSelectedOption);
      const lastSelectedOptionElement =
        selectStatus.options[lastSelectedOptionIndex];
      lastSelectedOptionElement.selected = false;
    }
  }
});

let checkStatus = () => {
  let statusInput = document.getElementById("statusOptions").value;
  let statusError = document.getElementById("errorStatus");
  if (statusInput === "") {
    statusError.style.display = "block";
    return false;
  } else {
    statusError.style.display = "none";
  }
};
document.getElementById("statusOptions").addEventListener("input", checkStatus);

// SHOW DATA IN TABLE
function showData() {
  let tableData = document.querySelector("#tableData tbody");
  tableData.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let row = "<tr>";
    row += "<td>" + data[i].anime + "</td>";
    row += "<td>" + data[i].season + "</td>";
    row += "<td>" + data[i].year + "</td>";
    row += "<td>" + data[i].status + "</td>";
    row +=
      "<td><button class='edit' type='button' onclick='editData(" +
      i +
      ")'>Edit</button>";
    row +=
      "<button class='delete' type='button' onclick='deleteData(" +
      i +
      ")'>Delete</button></td>";
    row += "</tr>";
    tableData.innerHTML += row;
  }
}

// ADD NEW DATA TO OBJECT
function addData() {
  let name = document.getElementById("inputName").value;
  let email = document.getElementById("inputEmail").value;
  let age = document.getElementById("inputAge").value;
  if (checkName() !== false && checkEmail() !== false && checkAge() !== false) {
    data.push({ name, email, age });
    localStorage.setItem("data", JSON.stringify(data));
  }
  showData();
}
document.getElementById("addData").addEventListener("click", addData);

// EDIT DATA
function editData(i) {
  let namePrompt = prompt("Edit Name", data[i].name);
  let emailPrompt = prompt("Edit Email", data[i].email);
  let agePrompt = prompt("Edit Age", data[i].age);
  if (
    checkName(namePrompt) !== false &&
    checkEmail(emailPrompt) !== false &&
    checkAge(agePrompt) !== false
  ) {
    data[i].name = namePrompt;
    data[i].email = emailPrompt;
    data[i].age = agePrompt;
    localStorage.setItem("data", JSON.stringify(data));
    showData();
  }
}

// DELETE DATA
function deleteData(i) {
  data.splice(i, 1);
  localStorage.setItem("data", JSON.stringify(data));
  showData();
}

// SHOW DATA ON LOAD
window.onload = function () {
  let storedData = localStorage.getItem("data");
  if (storedData !== null) {
    data = JSON.parse(storedData);
  }
  showData();
};
