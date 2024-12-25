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
// ================ Galvanized Fencing Wires Handler ================
const galvanizedWireHandler = {
  saveItem(item) {
    const items = JSON.parse(localStorage.getItem('galvanizedWireItems')) || [];
    if (this.editIndex !== null) {
      items[this.editIndex] = item;
      this.editIndex = null;
    } else {
      items.push(item);
    }
    localStorage.setItem('galvanizedWireItems', JSON.stringify(items));
  },

  loadItems() {
    const items = JSON.parse(localStorage.getItem('galvanizedWireItems')) || [];
    const addItemsDiv = document.getElementById('galvanized-wire-items');
    addItemsDiv.innerHTML = '';

    items.forEach((item, index) => {
      const itemCard = `
        <div class="item_name jumbotron col-12 col-lg-3 shadow m-3 p-4 justify-content-start rounded-2">
          <div class="item_name_title">
            <h3 class="fs-5 text-success text-start">${item.name}</h3>
            <hr>
          </div>
          <div class="item_name_body">
            <div class="item_price my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Price</h3>
              <h3 class="fs-6">${item.galvanizedWirePrice.toFixed(2)}</h3>
            </div>
            <div class="item_quntity my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Quantity</h3>
              <h3 class="fs-6">${item.galvanizedWireLength.toFixed(2)}</h3>
            </div>
            <div class="item_amount my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Amount</h3>
              <h3 class="fs-6 text-success">${item.galvanizedWireAmount.toFixed(2)}</h3>
            </div>
            <hr>
          </div>
          <div class="item_footer d-flex justify-content-end">
            <button class="btn btn-warning mx-1" onclick="galvanizedWireHandler.editItem(${index})"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger mx-1" onclick="galvanizedWireHandler.deleteItem(${index})"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
      `;
      addItemsDiv.insertAdjacentHTML('beforeend', itemCard);
    });
  },

  deleteItem(index) {
    const items = JSON.parse(localStorage.getItem('galvanizedWireItems')) || [];
    items.splice(index, 1);
    localStorage.setItem('galvanizedWireItems', JSON.stringify(items));
    this.loadItems();
  },

  editItem(index) {
    const items = JSON.parse(localStorage.getItem('galvanizedWireItems')) || [];
    const item = items[index];

    if (!item) {
      console.error("Item not found at index:", index);
      return;
    }

    document.getElementById('galvanized-wire-price').value = item.galvanizedWirePrice;
    document.getElementById('galvanized-wire-addtional').value = item.galvanizedWireAddtional || '';

    this.editIndex = index;
    const modal = new bootstrap.Modal(document.getElementById('addItemModal_01'));
    modal.show();
  },

  editIndex: null
};

// ================ Ceramic Reel Insulators Handler ================
const ceramicReelHandler = {
  saveItem(item) {
    const items = JSON.parse(localStorage.getItem('ceramicReelItems')) || [];
    if (this.editIndex !== null) {
      items[this.editIndex] = item;
      this.editIndex = null;
    } else {
      items.push(item);
    }
    localStorage.setItem('ceramicReelItems', JSON.stringify(items));
  },

  loadItems() {
    const items = JSON.parse(localStorage.getItem('ceramicReelItems')) || [];
    const addItemsDiv = document.getElementById('ceramic-reel-items');
    addItemsDiv.innerHTML = '';

    items.forEach((item, index) => {
      const itemCard = `
        <div class="item_name jumbotron col-12 col-lg-3 shadow m-3 p-4 justify-content-start rounded-2">
          <div class="item_name_title">
            <h3 class="fs-5 text-success text-start">${item.name}</h3>
            <hr>
          </div>
          <div class="item_name_body">
            <div class="item_price my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Price</h3>
              <h3 class="fs-6">${item.ceramicReelPrice.toFixed(2)}</h3>
            </div>
            <div class="item_quntity my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Quantity</h3>
              <h3 class="fs-6">${item.ceramicReelQuantity.toFixed(2)}</h3>
            </div>
            <div class="item_amount my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Amount</h3>
              <h3 class="fs-6 text-success">${item.ceramicReelAmount.toFixed(2)}</h3>
            </div>
            <hr>
          </div>
          <div class="item_footer d-flex justify-content-end">
            <button class="btn btn-warning mx-1" onclick="ceramicReelHandler.editItem(${index})"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger mx-1" onclick="ceramicReelHandler.deleteItem(${index})"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
      `;
      addItemsDiv.insertAdjacentHTML('beforeend', itemCard);
    });
  },

  deleteItem(index) {
    const items = JSON.parse(localStorage.getItem('ceramicReelItems')) || [];
    items.splice(index, 1);
    localStorage.setItem('ceramicReelItems', JSON.stringify(items));
    this.loadItems();
  },

  editItem(index) {
    const items = JSON.parse(localStorage.getItem('ceramicReelItems')) || [];
    const item = items[index];

    document.getElementById('ceramic-reel-price').value = item.ceramicReelPrice;
    document.getElementById('ceramic-reel-defalt-value').value = item.ceramicReelDefaultValue;
    document.getElementById('ceramic-reel-addtional').value = item.ceramicReelAdditional || '';

    this.editIndex = index;
    const modal = new bootstrap.Modal(document.getElementById('addItemModal_02'));
    modal.show();
  },

  editIndex: null
};


// ================ Plastic Screw Reel Insulators ================
const plasticScrewReelHandler = {
  saveItem(item) {
    const items = JSON.parse(localStorage.getItem('plasticScrewReelItems')) || [];
    if (this.editIndex !== null) {
      items[this.editIndex] = item;
      this.editIndex = null;
    } else {
      items.push(item);
    }
    localStorage.setItem('plasticScrewReelItems', JSON.stringify(items));
  },

  loadItems() {
    const items = JSON.parse(localStorage.getItem('plasticScrewReelItems')) || [];
    const addItemsDiv = document.getElementById('plastic-screw-reel-items');
    addItemsDiv.innerHTML = '';

    items.forEach((item, index) => {
      const itemCard = `
        <div class="item_name jumbotron col-12 col-lg-3 shadow m-3 p-4 justify-content-start rounded-2">
          <div class="item_name_title">
            <h3 class="fs-5 text-success text-start">${item.name}</h3>
            <hr>
          </div>
          <div class="item_name_body">
            <div class="item_price my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Price</h3>
              <h3 class="fs-6">${item.plasticScrewReelPrice.toFixed(2)}</h3>
            </div>
            <div class="item_quntity my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Quantity</h3>
              <h3 class="fs-6">${item.plasticScrewReelQuantity.toFixed(2)}</h3>
            </div>
            <div class="item_amount my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Amount</h3>
              <h3 class="fs-6 text-success">${item.plasticScrewReelAmount.toFixed(2)}</h3>
            </div>
            <hr>
          </div>
          <div class="item_footer d-flex justify-content-end">
            <button class="btn btn-warning mx-1" onclick="plasticScrewReelHandler.editItem(${index})"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger mx-1" onclick="plasticScrewReelHandler.deleteItem(${index})"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
      `;
      addItemsDiv.insertAdjacentHTML('beforeend', itemCard);
    });
  },

  deleteItem(index) {
    const items = JSON.parse(localStorage.getItem('plasticScrewReelItems')) || [];
    items.splice(index, 1);
    localStorage.setItem('plasticScrewReelItems', JSON.stringify(items));
    this.loadItems();
  },

  editItem(index) {
    const items = JSON.parse(localStorage.getItem('plasticScrewReelItems')) || [];
    const item = items[index];

    document.getElementById('plastic-screw-reel-price').value = item.plasticScrewReelPrice;
    document.getElementById('plastic-screw-reel-defalt-value').value = item.plasticScrewReelDefaultValue;
    document.getElementById('plastic-screw-reel-addtional').value = item.plasticScrewReelAdditional || '';

    this.editIndex = index;
    const modal = new bootstrap.Modal(document.getElementById('addItemModal_03'));
    modal.show();
  },

  editIndex: null
};


// ================ Ceramic Bullnose Insulators ================
const ceramicBullnoseHandler = {
  saveItem(item) {
    const items = JSON.parse(localStorage.getItem('ceramicBullnoseItems')) || [];
    if (this.editIndex !== null) {
      items[this.editIndex] = item;
      this.editIndex = null;
    } else {
      items.push(item);
    }
    localStorage.setItem('ceramicBullnoseItems', JSON.stringify(items));
  },

  loadItems() {
    const items = JSON.parse(localStorage.getItem('ceramicBullnoseItems')) || [];
    const addItemsDiv = document.getElementById('ceramic-bullnose-items');
    addItemsDiv.innerHTML = '';

    items.forEach((item, index) => {
      const itemCard = `
        <div class="item_name jumbotron col-12 col-lg-3 shadow m-3 p-4 justify-content-start rounded-2">
          <div class="item_name_title">
            <h3 class="fs-5 text-success text-start">${item.name}</h3>
            <hr>
          </div>
          <div class="item_name_body">
            <div class="item_price my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Price</h3>
              <h3 class="fs-6">${item.ceramicBullnosePrice.toFixed(2)}</h3>
            </div>
            <div class="item_quntity my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Quantity</h3>
              <h3 class="fs-6">${item.ceramicBullnoseQuantity.toFixed(2)}</h3>
            </div>
            <div class="item_amount my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Amount</h3>
              <h3 class="fs-6 text-success">${item.ceramicBullnoseAmount.toFixed(2)}</h3>
            </div>
            <hr>
          </div>
          <div class="item_footer d-flex justify-content-end">
            <button class="btn btn-warning mx-1" onclick="ceramicBullnoseHandler.editItem(${index})"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger mx-1" onclick="ceramicBullnoseHandler.deleteItem(${index})"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
      `;
      addItemsDiv.insertAdjacentHTML('beforeend', itemCard);
    });
  },


  deleteItem(index) {
    const items = JSON.parse(localStorage.getItem('ceramicBullnoseItems')) || [];
    items.splice(index, 1);
    localStorage.setItem('ceramicBullnoseItems', JSON.stringify(items));
    this.loadItems();
  },

  editItem(index) {
    const items = JSON.parse(localStorage.getItem('ceramicBullnoseItems')) || [];
    const item = items[index];

    document.getElementById('ceramic-bullnose-price').value = item.ceramicBullnosePrice;
    document.getElementById('ceramic-bullnose-addtional').value = item.ceramicBullnoseAdditional || '';

    this.editIndex = index;
    const modal = new bootstrap.Modal(document.getElementById('addItemModal_04'));
    modal.show();
  },

  editIndex: null
};

// ================ Wire Tighterners ================
const wireTighternersHandler = {
  saveItem(item) {
    const items = JSON.parse(localStorage.getItem('wireTighternersItems')) || [];
    if (this.editIndex !== null) {
      items[this.editIndex] = item;
      this.editIndex = null;
    } else {
      items.push(item);
    }
    localStorage.setItem('wireTighternersItems', JSON.stringify(items));
  },

  loadItems() {
    const items = JSON.parse(localStorage.getItem('wireTighternersItems')) || [];
    const addItemsDiv = document.getElementById('wire-tighterners-items');
    addItemsDiv.innerHTML = '';

    items.forEach((item, index) => {
      const itemCard = `
        <div class="item_name jumbotron col-12 col-lg-3 shadow m-3 p-4 justify-content-start rounded-2">
          <div class="item_name_title">
            <h3 class="fs-5 text-success text-start">${item.name}</h3>
            <hr>
          </div>
          <div class="item_name_body">
            <div class="item_price my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Price</h3>
              <h3 class="fs-6">${item.wireTighternersPrice.toFixed(2)}</h3>
            </div>
            <div class="item_quntity my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Quantity</h3>
              <h3 class="fs-6">${item.wireTighternersQuantity.toFixed(2)}</h3>
            </div>
            <div class="item_amount my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Amount</h3>
              <h3 class="fs-6 text-success">${item.wireTighternersAmount.toFixed(2)}</h3>
            </div>
            <hr>
          </div>
          <div class="item_footer d-flex justify-content-end">
            <button class="btn btn-warning mx-1" onclick="wireTighternersHandler.editItem(${index})"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger mx-1" onclick="wireTighternersHandler.deleteItem(${index})"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
      `;
      addItemsDiv.insertAdjacentHTML('beforeend', itemCard);
    });
  },


  deleteItem(index) {
    const items = JSON.parse(localStorage.getItem('wireTighternersItems')) || [];
    items.splice(index, 1);
    localStorage.setItem('wireTighternersItems', JSON.stringify(items));
    this.loadItems();
  },

  editItem(index) {
    const items = JSON.parse(localStorage.getItem('wireTighternersItems')) || [];
    const item = items[index];

    document.getElementById('wire-tighterners-price').value = item.wireTighternersPrice;
    document.getElementById('wire-tighterners-addtional').value = item.wireTighternersAdditional || '';

    this.editIndex = index;
    const modal = new bootstrap.Modal(document.getElementById('addItemModal_05'));
    modal.show();
  },

  editIndex: null
};


// ================ Gate Springs Sets ================
const gateSpringsHandler = {
  saveItem(item) {
    const items = JSON.parse(localStorage.getItem('gateSpringsItems')) || [];
    if (this.editIndex !== null) {
      items[this.editIndex] = item;
      this.editIndex = null;
    } else {
      items.push(item);
    }
    localStorage.setItem('gateSpringsItems', JSON.stringify(items));
  },

  loadItems() {
    const items = JSON.parse(localStorage.getItem('gateSpringsItems')) || [];
    const addItemsDiv = document.getElementById('gate-springs-items');
    addItemsDiv.innerHTML = '';

    items.forEach((item, index) => {
      const itemCard = `
        <div class="item_name jumbotron col-12 col-lg-3 shadow m-3 p-4 justify-content-start rounded-2">
          <div class="item_name_title">
            <h3 class="fs-5 text-success text-start">${item.name}</h3>
            <hr>
          </div>
          <div class="item_name_body">
            <div class="item_price my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Price</h3>
              <h3 class="fs-6">${item.gateSpringsPrice.toFixed(2)}</h3>
            </div>
            <div class="item_quntity my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Quantity</h3>
              <h3 class="fs-6">${item.gateSpringsQuantity.toFixed(2)}</h3>
            </div>
            <div class="item_amount my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Amount</h3>
              <h3 class="fs-6 text-success">${item.gateSpringsAmount.toFixed(2)}</h3>
            </div>
            <hr>
          </div>
          <div class="item_footer d-flex justify-content-end">
            <button class="btn btn-warning mx-1" onclick="gateSpringsHandler.editItem(${index})"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger mx-1" onclick="gateSpringsHandler.deleteItem(${index})"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
      `;
      addItemsDiv.insertAdjacentHTML('beforeend', itemCard);
    });
  },

  deleteItem(index) {
    const items = JSON.parse(localStorage.getItem('gateSpringsItems')) || [];
    items.splice(index, 1);
    localStorage.setItem('gateSpringsItems', JSON.stringify(items));
    this.loadItems();
  },

  editItem(index) {
    const items = JSON.parse(localStorage.getItem('gateSpringsItems')) || [];
    const item = items[index];

    document.getElementById('gate-springs-sets-price').value = item.gateSpringsPrice;
    // document.getElementById('wire-tighterners-addtional').value = item.wireTighternersAdditional || '';

    this.editIndex = index;
    const modal = new bootstrap.Modal(document.getElementById('addItemModal_06'));
    modal.show();
  },

  editIndex: null
};

// ================ Warning Sign Bords ================
const warningSignBordsHandler = {
  saveItem(item) {
    const items = JSON.parse(localStorage.getItem('warningSignBordsItems')) || [];
    if (this.editIndex !== null) {
      items[this.editIndex] = item;
      this.editIndex = null;
    } else {
      items.push(item);
    }
    localStorage.setItem('warningSignBordsItems', JSON.stringify(items));
  },

  loadItems() {
    const items = JSON.parse(localStorage.getItem('warningSignBordsItems')) || [];
    const addItemsDiv = document.getElementById('warning-sign-bords-items');
    addItemsDiv.innerHTML = '';

    items.forEach((item, index) => {
      const itemCard = `
        <div class="item_name jumbotron col-12 col-lg-3 shadow m-3 p-4 justify-content-start rounded-2">
          <div class="item_name_title">
            <h3 class="fs-5 text-success text-start">${item.name}</h3>
            <hr>
          </div>
          <div class="item_name_body">
            <div class="item_price my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Price</h3>
              <h3 class="fs-6">${item.warningSignBordsPrice.toFixed(2)}</h3>
            </div>
            <div class="item_quntity my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Quantity</h3>
              <h3 class="fs-6">${item.warningSignBordsQuantity.toFixed(2)}</h3>
            </div>
            <div class="item_amount my-3 d-flex justify-content-between align-items-center">
              <h3 class="fs-6">Item Amount</h3>
              <h3 class="fs-6 text-success">${item.warningSignBordsAmount.toFixed(2)}</h3>
            </div>
            <hr>
          </div>
          <div class="item_footer d-flex justify-content-end">
            <button class="btn btn-warning mx-1" onclick="warningSignBordsHandler.editItem(${index})"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger mx-1" onclick="warningSignBordsHandler.deleteItem(${index})"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
      `;
      addItemsDiv.insertAdjacentHTML('beforeend', itemCard);
    });
  },

  deleteItem(index) {
    const items = JSON.parse(localStorage.getItem('warningSignBordsItems')) || [];
    items.splice(index, 1);
    localStorage.setItem('warningSignBordsItems', JSON.stringify(items));
    this.loadItems();
  },

  editItem(index) {
    const items = JSON.parse(localStorage.getItem('warningSignBordsItems')) || [];
    const item = items[index];

    document.getElementById('warning-sign-bords-price').value = item.warningSignBordsPrice;
    // document.getElementById('wire-tighterners-addtional').value = item.wireTighternersAdditional || '';

    this.editIndex = index;
    const modal = new bootstrap.Modal(document.getElementById('addItemModal_07'));
    modal.show();
  },

  editIndex: null
};

// Event Listeners//////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  galvanizedWireHandler.loadItems();
  ceramicReelHandler.loadItems();
  plasticScrewReelHandler.loadItems();
  ceramicBullnoseHandler.loadItems();
  wireTighternersHandler.loadItems();
  gateSpringsHandler.loadItems();
  warningSignBordsHandler.loadItems();
});

//////////////////////////////////////////////Galvanized Fencing Wires////////////////////////////////////////////////////////
document.getElementById('addItemModal_01_btn').addEventListener('click', () => {
  const price = parseFloat(document.getElementById('galvanized-wire-price').value);
  const additional = parseInt(document.getElementById('galvanized-wire-addtional').value, 10);

  if (!price || isNaN(price) || !additional || isNaN(additional)) {
    alert('Please enter valid values');
    return;
  }

  const existingData = JSON.parse(localStorage.getItem("userData")) || [];
  if (existingData.length === 0) {
    alert("Please enter fence details first");
    return;
  }

  const latestData = existingData[existingData.length - 1];
  const perimeter = parseInt(latestData.perimeter, 10);
  const numOfLines = parseInt(latestData.numOfLines, 10);
  const typeOfFence = latestData.typeOfFence;

  let length = 0;
  if (typeOfFence === "2.5mm") {
    length = (perimeter * numOfLines) / 76 + additional;
  } else if (typeOfFence === "2.00mm") {
    length = (perimeter * numOfLines) / 110 + additional;
  }

  const amount = price * length;
  
  const item = {
    name: 'Galvanized Fencing Wires',
    galvanizedWirePrice: price,
    galvanizedWireLength: length,
    galvanizedWireAmount: amount,
    galvanizedWireAddtional: additional
  };

  galvanizedWireHandler.saveItem(item);
  galvanizedWireHandler.loadItems();

  // Reset and close
  document.getElementById('galvanized-wire-price').value = '';
  document.getElementById('galvanized-wire-addtional').value = '';
  bootstrap.Modal.getInstance(document.getElementById('addItemModal_01')).hide();
});


////////////////////////////////////////////////Ceramic Reel Insulators//////////////////////////////////////////////////////
// Ceramic Reel Add/Edit Button Handler
document.getElementById('addItemModal_02_btn').addEventListener('click', () => {
  const price = parseFloat(document.getElementById('ceramic-reel-price').value);
  const defaultValue = parseFloat(document.getElementById('ceramic-reel-defalt-value').value);
  const additional = parseInt(document.getElementById('ceramic-reel-addtional').value, 10);

  if (!price || !defaultValue || !additional || isNaN(price) || isNaN(defaultValue) || isNaN(additional)) {
    alert('Please enter valid values');
    return;
  }

  const existingData = JSON.parse(localStorage.getItem("userData")) || [];
  if (existingData.length === 0) {
    alert("Please enter fence details first");
    return;
  }

  const latestData = existingData[existingData.length - 1];
  const perimeter = parseInt(latestData.perimeter, 10);
  const numOfLines = parseInt(latestData.numOfLines, 10);

  const quantity = ((perimeter / defaultValue) * numOfLines) + additional;
  const amount = price * quantity;

  const item = {
    name: 'Ceramic Reel Insulators',
    ceramicReelPrice: price,
    ceramicReelQuantity: quantity,
    ceramicReelAmount: amount,
    ceramicReelDefaultValue: defaultValue,
    ceramicReelAdditional: additional
  };

  ceramicReelHandler.saveItem(item);
  ceramicReelHandler.loadItems();

  // Reset and close
  document.getElementById('ceramic-reel-price').value = '';
  document.getElementById('ceramic-reel-defalt-value').value = '';
  document.getElementById('ceramic-reel-addtional').value = '';
  bootstrap.Modal.getInstance(document.getElementById('addItemModal_02')).hide();
});
////////////////////////////////////////////////Ceramic Reel Insulators//////////////////////////////////////////////////////

////////////////////////////////////////////////Plastic Screw Reel Insulators//////////////////////////////////////////////////////

document.getElementById('addItemModal_03_btn').addEventListener('click', () => {
  const price = parseFloat(document.getElementById('plastic-screw-reel-price').value);
  const defaultValue = parseFloat(document.getElementById('plastic-screw-reel-defalt-value').value);
  const additional = parseInt(document.getElementById('plastic-screw-reel-addtional').value, 10);

  if (!price || !defaultValue || !additional || isNaN(price) || isNaN(defaultValue) || isNaN(additional)) {
    alert('Please enter valid values');
    return;
  }

  const existingData = JSON.parse(localStorage.getItem("userData")) || [];
  if (existingData.length === 0) {
    alert("Please enter fence details first");
    return;
  }

  const latestData = existingData[existingData.length - 1];
  const perimeter = parseInt(latestData.perimeter, 10);
  const numOfLines = parseInt(latestData.numOfLines, 10);

  const quantity = ((perimeter / defaultValue) * numOfLines) + additional;
  const amount = price * quantity;

  const item = {
    name: 'Plastic Screw Reel Insulators',
    plasticScrewReelPrice: price,
    plasticScrewReelQuantity: quantity,
    plasticScrewReelAmount: amount,
    plasticScrewReelDefaultValue: defaultValue,
    plasticScrewReelAdditional: additional
  };

  plasticScrewReelHandler.saveItem(item);
  plasticScrewReelHandler.loadItems();

  // Reset and close
  document.getElementById('plastic-screw-reel-price').value = '';
  document.getElementById('plastic-screw-reel-defalt-value').value = '';
  document.getElementById('plastic-screw-reel-addtional').value = '';
  bootstrap.Modal.getInstance(document.getElementById('addItemModal_03')).hide();
});

////////////////////////////////////////////////Plastic Screw Reel Insulators//////////////////////////////////////////////////////

////////////////////////////////////////////////Ceramic Bullnose Insulators//////////////////////////////////////////////////////
document.getElementById('addItemModal_04_btn').addEventListener('click', () => {
  const price = parseFloat(document.getElementById('ceramic-bullnose-price').value);
  const additional = parseInt(document.getElementById('ceramic-bullnose-addtional').value, 10);

  if (!price || isNaN(price) || !additional || isNaN(additional)) {
    alert('Please enter valid values');
    return;
  }

  const existingData = JSON.parse(localStorage.getItem("userData")) || [];
  if (existingData.length === 0) {
    alert("Please enter fence details first");
    return;
  }

  const latestData = existingData[existingData.length - 1];
  const numOfCorners = parseInt(latestData.numOfCorners, 10);
  const numOfLines = parseInt(latestData.numOfLines, 10);
  const numOfGates = parseInt(latestData.numOfGates, 10);

  // const quantity = ((perimeter / defaultValue) * numOfLines) + additional;
  const quantity =  (numOfCorners+(numOfGates*2) * numOfLines) + additional;
  const amount = price * quantity;

  const item = {
    name: 'Ceramic Bullnose Insulators',
    ceramicBullnosePrice: price,
    ceramicBullnoseQuantity: quantity,
    ceramicBullnoseAmount: amount,
    ceramicBullnoseAdditional: additional
  };

  ceramicBullnoseHandler.saveItem(item);
  ceramicBullnoseHandler.loadItems();

  // Reset and close
  document.getElementById('ceramic-bullnose-price').value = '';
  document.getElementById('ceramic-bullnose-addtional').value = '';
  bootstrap.Modal.getInstance(document.getElementById('addItemModal_04')).hide();
});
////////////////////////////////////////////////Ceramic Bullnose Insulators//////////////////////////////////////////////////////

////////////////////////////////////////////////Wire Tighterners//////////////////////////////////////////////////////
document.getElementById('addItemModal_05_btn').addEventListener('click', () => {
  const price = parseFloat(document.getElementById('wire-tighterners-price').value);
  const additional = parseInt(document.getElementById('wire-tighterners-addtional').value, 10);

  if (!price || isNaN(price) || !additional || isNaN(additional)) {
    alert('Please enter valid values');
    return;
  }

  const existingData = JSON.parse(localStorage.getItem("userData")) || [];
  if (existingData.length === 0) {
    alert("Please enter fence details first");
    return;
  }

  const latestData = existingData[existingData.length - 1];
  const numOfCorners = parseInt(latestData.numOfCorners, 10);
  const numOfLines = parseInt(latestData.numOfLines, 10);
  const numOfGates = parseInt(latestData.numOfGates, 10);

  const quantity = (((numOfCorners - 1) * numOfLines) + (numOfGates * numOfLines * 2)) + additional ;
  const amount = price * quantity;

  const item = {
    name: 'Wire Tighterners',
    wireTighternersPrice: price,
    wireTighternersQuantity: quantity,
    wireTighternersAmount: amount,
    wireTighternersAdditional: additional
  };

  wireTighternersHandler.saveItem(item);
  wireTighternersHandler.loadItems();

  // Reset and close
  document.getElementById('wire-tighterners-price').value = '';
  document.getElementById('wire-tighterners-addtional').value = '';
  bootstrap.Modal.getInstance(document.getElementById('addItemModal_05')).hide();
});

////////////////////////////////////////////////Wire Tighterners//////////////////////////////////////////////////////

////////////////////////////////////////////////Gate Springs Sets//////////////////////////////////////////////////////

document.getElementById('addItemModal_06_btn').addEventListener('click', () => {
  const price = parseFloat(document.getElementById('gate-springs-sets-price').value);
  // const additional = parseInt(document.getElementById('wire-tighterners-addtional').value, 10);

  if (!price || isNaN(price)) {
    alert('Please enter valid values');
    return;
  }

  const existingData = JSON.parse(localStorage.getItem("userData")) || [];
  if (existingData.length === 0) {
    alert("Please enter fence details first");
    return;
  }

  const latestData = existingData[existingData.length - 1];
  const numOfLines = parseInt(latestData.numOfLines, 10);
  const numOfGates = parseInt(latestData.numOfGates, 10);

  const quantity = numOfGates * numOfLines;
  const amount = price * quantity;

  const item = {
    name: 'Gate Springs Sets',
    gateSpringsPrice: price,
    gateSpringsQuantity: quantity,
    gateSpringsAmount: amount,
    // wireTighternersAdditional: additional
  };

  gateSpringsHandler.saveItem(item);
  gateSpringsHandler.loadItems();

  // Reset and close
  document.getElementById('gate-springs-sets-price').value = '';
  // document.getElementById('wire-tighterners-addtional').value = '';
  bootstrap.Modal.getInstance(document.getElementById('addItemModal_06')).hide();
});

////////////////////////////////////////////////Gate Springs Sets//////////////////////////////////////////////////////

////////////////////////////////////////////////Warning Sign Bords//////////////////////////////////////////////////////

document.getElementById('addItemModal_07_btn').addEventListener('click', () => {
  const price = parseFloat(document.getElementById('warning-sign-bords-price').value);
  // const additional = parseInt(document.getElementById('wire-tighterners-addtional').value, 10);

  if (!price || isNaN(price)) {
    alert('Please enter valid values');
    return;
  }

  const existingData = JSON.parse(localStorage.getItem("userData")) || [];
  if (existingData.length === 0) {
    alert("Please enter fence details first");
    return;
  }

  const latestData = existingData[existingData.length - 1];
  const perimeter = parseInt(latestData.perimeter, 10);

  const quantity = (perimeter / 820);
  const amount = price * quantity;

  const item = {
    name: 'Warning Sign Bords',
    warningSignBordsPrice: price,
    warningSignBordsQuantity: quantity,
    warningSignBordsAmount: amount,
    // wireTighternersAdditional: additional
  };

  warningSignBordsHandler.saveItem(item);
  warningSignBordsHandler.loadItems();

  // Reset and close
  document.getElementById('warning-sign-bords-price').value = '';
  // document.getElementById('wire-tighterners-addtional').value = '';
  bootstrap.Modal.getInstance(document.getElementById('addItemModal_07')).hide();
});

////////////////////////////////////////////////Warning Sign Bords//////////////////////////////////////////////////////

