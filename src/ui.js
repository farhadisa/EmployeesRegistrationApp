export class UI {
  constructor() {
    this.employeeList = document.getElementById("employees");
    this.nameInput = document.getElementById("name");
    this.departmentInput = document.getElementById("department");
    this.salaryInput = document.getElementById("salary");
    this._idInput = document.getElementById("_id");
    this.updateButton = document.getElementById("update");
    this.firstCardBody = document.querySelectorAll(".card-body")[0];
  }

  addEmployeesToUi(employees) {
    let result = "";

    employees.forEach((employee) => {
      result += `
            <tr>                                
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee._id}</td>
                <td style="display: none;">${employee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td>
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td> 
            </tr>    
            `;
    });

    this.employeeList.innerHTML = result;
  }

  clearInputs() {
    this.nameInput.value = "";
    this.departmentInput.value = "";
    this.salaryInput.value = "";
    this._idInput.value = "";
  }

  addEmployeeToUi(employee) {
    this.employeeList.innerHTML += `
            <tr>                                
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee._id}</td>
                <td style="display: none;">${employee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td>
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td> 
            </tr>       
        `;
  }

  deleteEmployeeFromUi(element) {
    element.remove();
  }

  toggleUpdateButton(target) {
    if (this.updateButton.style.display === "none") {
      this.updateButton.style.display = "block";
      this.addEmployeeInfoToInputs(target);
    } else {
      this.updateButton.style.display = "none";
      this.clearInputs();
    }
  }

  addEmployeeInfoToInputs(target) {
    const children = target.children;

    this.nameInput.value = children[0].textContent;
    this.departmentInput.value = children[1].textContent;
    this.salaryInput.value = children[2].textContent;
    this._idInput.value = children[3].textContent;
  }

  updateEmployeeOnUi(employee, parent) {
    parent.innerHTML = `
            <tr>                                
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee._id}</td>
                <td style="display: none;">${employee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td>
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td> 
            </tr>    
        `;
    this.clearInputs();
  }

  showAlert(type, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;
    // console.log(div);
    this.firstCardBody.appendChild(div);

    setTimeout(() => {
      div.remove();
    }, 2000);
  }
}
