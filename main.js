function dataValidation(formData) {
  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z\s]+$/;
  const numberRegex = /^[0-9]+$/;

  if (!numberRegex.test(formData.customerNum)) {
    alert("Customer number should be numeric.");
    return { isValid: false };
  }

  if (!nameRegex.test(formData.customerName)) {
    alert("Customer name should contain only letters and spaces.");
    return { isValid: false };
  }

  if (!formData.issueDate) {
    alert("Please select a valid date.");
    return { isValid: false };
  }

  if (
    !numberRegex.test(formData.perimeter) ||
    parseInt(formData.perimeter) <= 0
  ) {
    alert("Perimeter should be a positive number.");
    return { isValid: false };
  }

  if (
    !numberRegex.test(formData.numOfLines) ||
    parseInt(formData.numOfLines) <= 0
  ) {
    alert("Number of lines should be a positive number.");
    return { isValid: false };
  }

  if (
    !numberRegex.test(formData.numOfCorners) ||
    parseInt(formData.numOfCorners) < 0
  ) {
    alert("Number of corners should be a non-negative number.");
    return { isValid: false };
  }

  if (
    !numberRegex.test(formData.numOfGates) ||
    parseInt(formData.numOfGates) < 0
  ) {
    alert("Number of gates should be a non-negative number.");
    return { isValid: false };
  }

  if (formData.typeOfFence === "Choose...") {
    alert("Please select a valid fence type.");
    return { isValid: false };
  }

  return { isValid: true };
}

function getFormData() {
  return {
    customerNum: document.getElementById("customer-num").value.trim(),
    customerName: document.getElementById("customer-name").value.trim(),
    issueDate: document.getElementById("issue-date").value,
    perimeter: document.getElementById("perimeter").value.trim(),
    numOfLines: document.getElementById("num_of_lines").value.trim(),
    numOfCorners: document.getElementById("num_of_corners").value.trim(),
    numOfGates: document.getElementById("num_of_gates").value.trim(),
    typeOfFence: document.getElementById("type_of_fence").value,
  };
}

function validateForm() {
  const formData = getFormData();
  const validation = dataValidation(formData);

  if (validation.isValid) {
    processFormData(formData);
    alert("Form data is valid!");
    return true;
  }

  return false;
}
////////////////////////////////////////////////////////////////////////////

let galvanizeWirelength;
let amountOfgalvanizeWire;
let addItemDiv = document.getElementById("add-items");
let counter = 0;

document.getElementById("addItemModal_01_btn").addEventListener("click", () => {
  const formData = getFormData();
  const validation = dataValidation(formData);

  if (validation.isValid) {
    galvanizeWireCla(
      formData.perimeter,
      formData.numOfLines,
      formData.typeOfFence
    );

    return true;
  }
});

function galvanizeWireCla(new_perimeter, new_numOfLines, new_typeOfFence) {
  const galvanizeWirePrice =
    parseInt(document.getElementById("galvanized-wire-price").value.trim()) ||
    0;
  const galvanizeWireAdditional =
    parseInt(
      document.getElementById("galvanized-wire-addtional").value.trim()
    ) || 0;

  // Parse input parameters
  new_perimeter = parseInt(new_perimeter) || 0;
  new_numOfLines = parseInt(new_numOfLines) || 0;

  if (new_typeOfFence === "2.5mm") {
    galvanizeWirelength =
      (new_perimeter * new_numOfLines) / 76 + galvanizeWireAdditional;
    console.log(galvanizeWirelength);
  } else if (new_typeOfFence === "2.00mm") {
    galvanizeWirelength =
      (new_perimeter * new_numOfLines) / 110 + galvanizeWireAdditional;
  }

  amountOfgalvanizeWire = galvanizeWirelength * galvanizeWirePrice;

  

  let newDiv = document.createElement("div");
  newDiv.classList.add(
    "add_item_container",
    "w-100",
    "d-flex",
    "flex-wrap",
    "justify-content-start"
  );
  newDiv.innerHTML += `
        <div class="item_name jumbotron col-12 col-lg-3 shadow m-3 p-4 justify-content-start rounded-2">
          <div class="item_name_title">
            <h3 class="fs-5 text-success text-start">Galvanized Fencing Wires</h3>
            <hr>
          </div>
          <div class="item_name_body">
            <div class="item_price my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Price</h3>
              <h3 class="fs-6">${galvanizeWirePrice}</h3>
            </div>
              <div class="item_quntity my-3 d-flex justify-content-between align-items-center">
                <h3 class="fs-6">Item Quntity</h3>
                <h3 class="fs-6">${galvanizeWirelength.toFixed(2)}</h3>
              </div>
              <div class="item_amount my-3 d-flex justify-content-between align-items-center">
                <h3 class="fs-6">Item Amount</h3>
                <h3 class="fs-6 text-success">${Math.round(amountOfgalvanizeWire)+ ".00"}</h3>
              </div>
              <hr>
          </div>
          <div class="item_footer d-flex justify-content-end">
            <button id="edit_glfewi" class="btn btn-warning mx-1"><i class="bi bi-pencil"></i></button>
            <button id="remove_glfewi" class="btn btn-danger mx-1"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
    `;

  if(counter < 1) {
    addItemDiv.appendChild(newDiv);
    counter++ ;
  }

  // Add event listener for dynamically created "remove_glfewi" button
newDiv.querySelector("#remove_glfewi").addEventListener("click", () => {
  if (addItemDiv.children.length > 0) {
    addItemDiv.removeChild(newDiv);
    
    counter-- ;
  }
});

}

////////////////////////////////////////////////////////////////////////////

function processFormData(formData) {
  console.log("Processing:", formData);
}
