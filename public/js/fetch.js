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

const button = document.querySelector("#button");
button.addEventListener("click", (e) => RegisterUsers(e));

function RegisterUsers(e) {
  e.preventDefault;
  const xhttp = new XMLHttpRequest();
  // const userID = new Date().getTime();
  const userName = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const passWord1 = document.getElementById("password1").value;
  const passWord2 = document.getElementById("password2").value;
  const UserSubmitedCredentialsObj = {
    // userID,
    userName,
    email,
    passWord1,
    passWord2,
  };

  xhttp.onreadystatechange = () => {
    if(xhttp.status===304){
      window.location.href = "../login.html";
    }
    if(xhttp.status===900){
     alert("you have typed your username wrong, user name should only contain letters and numbers");
    }
  };

  xhttp.open("POST", "/register", true);

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.send(JSON.stringify(UserSubmitedCredentialsObj));
  // document.form.reset();
}
// -------------------------------------
// -------------------------------------
