import { Request } from "./requests";
import { UI } from "./ui";

const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const _idInput = document.getElementById("_id");
const employeeList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");

const request = new Request("http://localhost:3000/employees");
const ui = new UI();

let updateState = null;

addEventListeners();

function addEventListeners() {
  document.addEventListener("DOMContentLoaded", getAllEmployees);
  form.addEventListener("submit", addEmployee);
  employeeList.addEventListener("click", updateOrDelete);
  updateEmployeeButton.addEventListener("click", updateEmployee);
}

function getAllEmployees() {
  request
    .get()
    .then((employees) => {
      ui.addEmployeesToUi(employees);
    })
    .catch((err) => console.log(err));
}

function addEmployee() {
  const employeeName = nameInput.value.trim();
  const employeeDepartment = departmentInput.value.trim();
  const employeeSalary = salaryInput.value.trim();
  const employee_Id = _idInput.value.trim();

  if (
    employeeName === "" ||
    employeeDepartment === "" ||
    employeeSalary === "" ||
    employee_Id === ""
  ) {
    ui.showAlert("danger", "Lütfen tüm alanları doldurun");
  } else if (isNaN(employeeSalary)) {
    ui.showAlert("danger", "Lütfen Maaş alanına sayı giriniz");
  } else if (isNaN(employee_Id)) {
    ui.showAlert("danger", "Lütfen ID alanına sayı giriniz");
  } else {
    request
      .post({
        _id: Number(employee_Id),
        name: employeeName,
        department: employeeDepartment,
        salary: Number(employeeSalary),
      })
      .then((employee) => {
        ui.addEmployeeToUi(employee);
        ui.showAlert(
          "success",
          employeeName + " isimli çalışan başarıyla eklendi"
        );
      });
  }

  ui.clearInputs();
}

function updateOrDelete(e) {
  if (e.target.id === "update-employee") {
    //Update
    updateEmployeeController(e.target.parentElement.parentElement);
  } else if (e.target.id === "delete-employee") {
    //Delete
    deleteEmployee(e.target);
  }
}

function deleteEmployee(targetEmployee) {
  const id =
    targetEmployee.parentElement.previousElementSibling.previousElementSibling
      .textContent;

  const employeeName =
    targetEmployee.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.previousElementSibling.previousElementSibling
      .previousElementSibling.textContent;

  //console.log(document.querySelectorAll("#employees tr")[0].children[0].textContent);

  request
    .delete(id)
    .then((employee) => {
      ui.deleteEmployeeFromUi(targetEmployee.parentElement.parentElement);
      ui.showAlert(
        "danger",
        employeeName + " isimli çalışan kayıt listesinden silindi"
      );
    })
    .catch((err) => console.log(err));
}

function updateEmployeeController(targetEmployee) {
  ui.toggleUpdateButton(targetEmployee);

  if (updateState === null) {
    updateState = {
      updateId: targetEmployee.children[4].textContent,
      updateParent: targetEmployee,
    };
  } else {
    updateState = null;
  }
}

function updateEmployee() {
  if (updateState) {
    const data = {
      _id: _idInput.value.trim(),
      name: nameInput.value.trim(),
      department: departmentInput.value.trim(),
      salary: Number(salaryInput.value.trim()),
    };

    request.put(updateState.updateId, data).then((updatedEmployee) => {
      ui.updateEmployeeOnUi(updatedEmployee, updateState.updateParent);
      ui.showAlert("secondary", "Çalışan verileri başarıyla değiştirildi");
    });
  }
}
