// -------------------------------------
// ---------GENERAL FUNCTION------------

function fetch(method, url, cb, data = null) {
  const xhttp = new XMLHttpRequest();

  xhttp.onload = () => {
    if (xhttp.status >= 200 && xhttp.status < 300) {
      const response = JSON.parse(xhttp.respone);
      cb(response, data);
    }
  };

  xhttp.open(method, url, true);
  xhttp.send();
}

// --------------------------------------------
// --------LOAD AND SAVE TO BACKEND------------

function loadDataBase(callback) {
  fetch("GET", "/dataBaseOperations", callback);
}
function saveDataBase(callback) {
  fetch("POST", "/dataBaseOperations", callback);
}

// --------------------------------------------------
// ----REGISTER USER FROM REGISTER PAGE FUNC---------

const form = document.querySelector("#form");
form.addEventListener("submit", (e) => RegisterUsers(e));

function RegisterUsers(e) {
  e.preventDefault;
  const xhttp = new XMLHttpRequest();
  const userID = new Date().getTime();
  const userName = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const passWord1 = document.getElementById("password1").value;
  const passWord2 = document.getElementById("password2").value;
  const UserSubmitedCredentialsObj = {userID, userName, email, passWord1, passWord2 };
  xhttp.open("POST", "/register", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(UserSubmitedCredentialsObj));
}
// -------------------------------------
// -------------------------------------
