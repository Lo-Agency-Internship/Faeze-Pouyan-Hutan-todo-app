// ==============================================================================================
alert("hi");
const form = document.forms[0];

form.addEventListener("submit", function (event) {
  event.preventDefault();
  new FormData(form);
});

form.addEventListener("formdata", (event) => {
  const data = event.formData;

  const entries = [...data.entries()];
  console.log(entries);

  const values = [...data.values()];
  console.log(values);

  const id = new Date().getTime();
  const userName = values[1];
  const email = values[2];
  const password = values[3];
  const password2 = values[4];;

  const xhttp = new XMLHttpRequest();
  if (
    userName === null ||
    userName === "" ||
    email === null ||
    email === "" ||
    password === null ||
    password === "" ||
    password2 === null ||
    password2 === ""
  ) {
    alert("fields can not be empty");
    return false;
  } else if (
    ValidateName(userName) &&
    ValidateEmail(email) &&
    comparePasswords(password, password2)
  ) {
    xhttp.open("post", "/addUser", true);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send(JSON.stringify({ id, name, email, password }));
    alert("you are successfuly registered, please use the login button.");
    window.location.href = "login";
  } else {
    ("please try again");
  }
});

// ----------------------------------------------------
// ----------------------------------------------------
function ValidateName(name) {
  if (/^[a-zA-Z0-9]+$/.test(name)) {
    return true;
  } else {
    alert("Name should containt only -'A' or 'a'- to -'Z' or 'z'- and 0 to 9");
    return false;
  }
}
// -----------------------------------
function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  } else {
    alert("You have entered an invalid Email!");
    return false;
  }
}
// -----------------------------------------
function comparePasswords(password, password2) {
  if (password === password2) {
    return true;
  } else {
    alert("passwords must be the same!");
    return false;
  }
}
// ----------------------------------------------------
// ----------------------------------------------------
document.getElementById("userRegisterForm").reset();
