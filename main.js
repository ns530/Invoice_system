function dataValidation(formData) {
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

  if (!numberRegex.test(formData.perimeter) || parseInt(formData.perimeter) <= 0) {
    alert("Perimeter should be a positive number.");
    return { isValid: false };
  }

  if (!numberRegex.test(formData.numOfLines) || parseInt(formData.numOfLines) <= 0) {
    alert("Number of lines should be a positive number.");
    return { isValid: false };
  }

  if (!numberRegex.test(formData.numOfCorners) || parseInt(formData.numOfCorners) < 0) {
    alert("Number of corners should be a non-negative number.");
    return { isValid: false };
  }

  if (!numberRegex.test(formData.numOfGates) || parseInt(formData.numOfGates) < 0) {
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
    // processFormData(formData);
    saveDataToLocalStorage(formData);
    alert("Form data is valid!");
    return true;
  }

  return false;
}

// function processFormData(formData) {
//   console.log("Processing:", formData);
//   saveDataToLocalStorage(formData);
// }


function saveDataToLocalStorage(formData) {
  const existingData = JSON.parse(localStorage.getItem("userData")) || [];
  existingData.push(formData);
  localStorage.setItem("userData", JSON.stringify(existingData));
  renderUserData();
}

function renderUserData() {
  const dataContainer = document.getElementById("user-data-container");
  const existingData = JSON.parse(localStorage.getItem("userData")) || [];
  dataContainer.innerHTML = "";

  existingData.forEach((data, index) => {
    const card = document.createElement("div");
    card.className = "jumbotron p-4 shadow rounded";
    card.innerHTML = `
      <div class="card-body ">
        <h5 class="card-title">Customer No: ${data.customerNum}</h5>
        <p class="card-text">Name: ${data.customerName}</p>
        <p class="card-text">Date: ${data.issueDate}</p>
        <p class="card-text">Perimeter: ${data.perimeter} ft</p>
        <p class="card-text">Lines: ${data.numOfLines}</p>
        <p class="card-text">Corners: ${data.numOfCorners}</p>
        <p class="card-text">Gates: ${data.numOfGates}</p>
        <p class="card-text">Fence Type: ${data.typeOfFence}</p>
        <button class="btn btn-warning btn me-2" onclick="editUserData(${index})">Edit</button>
        <button class="btn btn-danger btn" onclick="deleteUserData(${index})">Delete</button>
      </div>
    `;
    dataContainer.appendChild(card);
  });
}

function deleteUserData(index) {
  const existingData = JSON.parse(localStorage.getItem("userData")) || [];
  existingData.splice(index, 1);
  localStorage.setItem("userData", JSON.stringify(existingData));
  renderUserData();
}

function editUserData(index) {
  const existingData = JSON.parse(localStorage.getItem("userData")) || [];
  const dataToEdit = existingData[index];

  // Populate the form with the selected data
  document.getElementById("customer-num").value = dataToEdit.customerNum;
  document.getElementById("customer-name").value = dataToEdit.customerName;
  document.getElementById("issue-date").value = dataToEdit.issueDate;
  document.getElementById("perimeter").value = dataToEdit.perimeter;
  document.getElementById("num_of_lines").value = dataToEdit.numOfLines;
  document.getElementById("num_of_corners").value = dataToEdit.numOfCorners;
  document.getElementById("num_of_gates").value = dataToEdit.numOfGates;
  document.getElementById("type_of_fence").value = dataToEdit.typeOfFence;

  // Remove the selected data and update localStorage
  deleteUserData(index);
}


document.addEventListener("DOMContentLoaded", renderUserData);


//////////////////////////////////////////////Galvanized Fencing Wires////////////////////////////////////////////////////////

let galvanizeWirelength;
let amountOfgalvanizeWire;
let addItemDiv = document.getElementById("add-items");
let galvanizeWireCounter = 0;

document.getElementById("addItemModal_01_btn").addEventListener("click", () => {
  const existingData = JSON.parse(localStorage.getItem("userData")) || [];
   console.log(existingData);
 
   if (existingData.length === 0) {
     console.log("No data to edit or process.");
   } else {
     console.log("Data to edit:", existingData[0]['customerName']);
     galvanizeWireCla(
      existingData[0]['perimeter'],
      existingData[0]['numOfLines'],
      existingData[0]['typeOfFence'],
    );
   }
    return true;
  
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
  newDiv.className = "box-product border justify-content-center";
  newDiv.innerHTML += `
        <div class="item_name w-100 jumbotron col-12 col-lg-3 shadow m-3 p-4 justify-content-start rounded-2">
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
                <h3 class="fs-6 text-success">${Math.round(amountOfgalvanizeWire) + ".00"}</h3>
              </div>
              <hr>
          </div>
          <div class="item_footer d-flex justify-content-end">
            <button class="btn btn-warning mx-1"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger mx-1" id="remove_glfewi"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
    `;

  if(galvanizeWireCounter < 1) {
    addItemDiv.appendChild(newDiv);
    galvanizeWireCounter++ ;
  }

  // Add event listener for dynamically created "remove_glfewi" button
newDiv.querySelector("#remove_glfewi").addEventListener("click", () => {
  if (addItemDiv.children.length > 0) {
    addItemDiv.removeChild(newDiv);
    
    galvanizeWireCounter-- ;
  }
});


}


////////////////////////////////////////////////Galvanized Fencing Wires//////////////////////////////////////////////////////

////////////////////////////////////////////////Ceramic Reel Insulators//////////////////////////////////////////////////////
let ceramicReelCounter = 0;

document.getElementById("addItemModal_02_btn").addEventListener("click", () => {
  const existingData = JSON.parse(localStorage.getItem("userData")) || [];
   console.log(existingData);
 
   if (existingData.length === 0) {
     console.log("No data to edit or process.");
   } else {
     console.log("Data to edit:", existingData[0]['customerName']);
     ceramicReelCal(
      existingData[0]['perimeter'],
      existingData[0]['numOfLines'],
    );
   }
    return true;
  
});

function ceramicReelCal(new_perimeter, new_numOfLines,) {
  const ceramicReelPrice = parseInt(document.getElementById("ceramic-reel-price").value.trim()) || 0;
const ceramicReelAdditional =
  parseInt(
    document.getElementById("ceramic-reel-addtional").value.trim()
  ) || 0;

const ceramicReelDefaltValue =
  parseInt(
    document.getElementById("ceramic-reel-defalt-value").value.trim()
  ) 

new_perimeter = parseInt(new_perimeter) || 0;
new_numOfLines = parseInt(new_numOfLines) || 0;

let ceramiReelQuantity = ((new_perimeter/ceramicReelDefaltValue) * new_numOfLines) + ceramicReelAdditional;

let amountOfCeramicReels = ceramiReelQuantity * ceramicReelPrice;


let newDiv = document.createElement("div");
newDiv.className = "box-product border justify-content-center d-flex flex-wrap";
newDiv.innerHTML += `
      <div class="item_name w-100 jumbotron col-12 col-lg-3 shadow m-3 p-4 justify-content-start rounded-2">
          <div class="item_name_title">
            <h3 class="fs-5 text-success text-start">Ceramic Reel Insulators</h3>
            <hr>
          </div>
          <div class="item_name_body">
            <div class="item_price my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Price</h3>
              <h3 class="fs-6">${ceramicReelPrice}</h3>
            </div>
              <div class="item_quntity my-3 d-flex justify-content-between align-items-center">
                <h3 class="fs-6">Item Quntity</h3>
                <h3 class="fs-6">${Math.round(ceramiReelQuantity) + 1}</h3>
              </div>
              <div class="item_amount my-3 d-flex justify-content-between align-items-center">
                <h3 class="fs-6">Item Amount</h3>
                <h3 class="fs-6 text-success">${Math.round(amountOfCeramicReels) + ".00"}</h3>
              </div>
              <hr>
          </div>
          <div class="item_footer d-flex justify-content-end">
            <button class="btn btn-warning mx-1"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger mx-1" id="remove_ceramic_reel"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
  `;

if(ceramicReelCounter < 1) {
  addItemDiv.appendChild(newDiv);
  ceramicReelCounter++ ;
}

newDiv.querySelector("#remove_ceramic_reel").addEventListener("click", () => {
  if (addItemDiv.children.length > 0) {
    addItemDiv.removeChild(newDiv);
    
    ceramicReelCounter-- ;
  }
});

}



////////////////////////////////////////////////Ceramic Reel Insulators//////////////////////////////////////////////////////


