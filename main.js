function dataValidation(formData) {
  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z\s]+$/;
  const numberRegex = /^[0-9]+$/;
  
  // Validating each field
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
      typeOfFence: document.getElementById("type_of_fence").value
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

document.getElementById("addItemModal_01_btn").addEventListener("click", () => {
  const formData = getFormData();
  const validation = dataValidation(formData);
  
  if (validation.isValid) {
      galvanizeWireCla(formData.perimeter, formData.numOfLines, formData.typeOfFence);
      return true;
  }
});

function galvanizeWireCla(new_perimeter, new_numOfLines, new_typeOfFence) {
  // Get and parse values with default of 0 if invalid
  const galvanizeWirePrice = parseInt(document.getElementById("galvanized-wire-price").value.trim()) || 0;
  const galvanizeWireAdditional = parseInt(document.getElementById("galvanized-wire-addtional").value.trim()) || 0;

  // Parse input parameters
  new_perimeter = parseInt(new_perimeter) || 0;
  new_numOfLines = parseInt(new_numOfLines) || 0;

  if(new_typeOfFence === "2.5mm") {
      galvanizeWirelength = ((new_perimeter * new_numOfLines)/76) + galvanizeWireAdditional;
      console.log(galvanizeWirelength);
  }
}



////////////////////////////////////////////////////////////////////////////



function processFormData(formData) {
  console.log('Processing:', formData);
  // Your processing logic here
}