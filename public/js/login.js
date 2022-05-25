// --------------------------------------------------
// ----LOGIN USER FROM LOGIN PAGE -------------------

const button = document.querySelector("#button");
button.addEventListener("click", (e) => LoginUsers(e));

function LoginUsers(e) {
  e.preventDefault;
  const xhttp = new XMLHttpRequest();
  const userName = document.getElementById("userName").value;
  const passWord1 = document.getElementById("password1").value;
  const UserSubmitedCredentialsObj = {
    userName,
    passWord1,
  };


  xhttp.onload = () => {
    switch (xhttp.status) {
    
      case 499:
        sessionStorage.setItem("user",JSON.stringify (userName))
        window.location.href = "../index.html";
        break;

      case 666:
        window.location.href = "../login.html";
        alert(
          "user or password is wrong"
        );
        break;

      default:
        break;
    }
  };

  xhttp.open("POST", "/login", true);

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.send(JSON.stringify(UserSubmitedCredentialsObj));
}
// -------------------------------------
// -------------------------------------