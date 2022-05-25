// --------------------------------------------------
// ----REGISTER USER FROM REGISTER PAGE FUNC---------

const button = document.querySelector("#button");
button.addEventListener("click", (e) => RegisterUsers(e));

function RegisterUsers(e) {
  e.preventDefault();
  const xhttp = new XMLHttpRequest();
  const userName = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const passWord1 = document.getElementById("password1").value;
  const passWord2 = document.getElementById("password2").value;
  const UserSubmitedCredentialsObj = {
    userName,
    email,
    passWord1,
    passWord2,
  };


  xhttp.onload = () => {
    switch (xhttp.status) {
      case 304:
        window.location.href = "../login.html";
        break;

      case 499:
        alert(
          "user name is used before, please choose another one"
        );
        break;

      case 666:
        alert(
          "you have used wrong format in your inputs:\n1-user name should only contain letters and numbers\n2-email should follow exam@exam.com\n3-passwords should match"
        );
        break;

      default:
        break;
    }
  };

  xhttp.open("POST", "/register", true);

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.send(JSON.stringify(UserSubmitedCredentialsObj));
}
// -------------------------------------
// -------------------------------------