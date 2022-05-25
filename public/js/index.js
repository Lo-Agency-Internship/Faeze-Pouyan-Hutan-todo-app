const xhttp = new XMLHttpRequest();
xhttp.onload = () => {
  switch (xhttp.status) {
    case 499:
      console.log(xhttp.response);
      localStorage.setItem("id", JSON.parse(xhttp.response.userID));
      break;
    default:
      break;
  }
};

xhttp.open("POST", "/login", true);

xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

xhttp.send(JSON.stringify(UserSubmitedCredentialsObj));
