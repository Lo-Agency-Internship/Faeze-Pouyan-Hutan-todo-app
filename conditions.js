// if (
//         userName === null ||
//         userName === "" ||
//         email === null ||
//         email === "" ||
//         password === null ||
//         password === "" ||
//         password2 === null ||
//         password2 === ""
//     ) {
//         alert("fields can not be empty");
//         return false;
//     } else if (
//         ValidateName(userName) &&
//         ValidateEmail(email) &&
//         comparePasswords(password, password2)
//     ) {
//         xhttp.open("post", "/addUser", true);
//         xhttp.setRequestHeader("content-type", "application/json");
//         xhttp.send(JSON.stringify({ id, userName, email, password, task }));
//         alert("you are successfuly registered, please use the login button.");
//         window.location.href = "login";
//     } else {
//         ("please try again");
//     }

module.exports = {
  autoIncremment: (dataBaseFile, UserSubmitedCredentialsObj) => {
    const autoID = Object.keys(dataBaseFile).length+1;
    UserSubmitedCredentialsObj.id = autoID;
    return UserSubmitedCredentialsObj;
  },

  ValidateName: (userName) => {
    if (/^[a-zA-Z0-9]+$/.test(userName)) {
      return true;
    } else {
      return false;
    }
  },

  ValidateEmail: (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    } else {
      alert("You have entered an invalid Email!");
      return false;
    }
  },

  comparePasswords: (password, password2) => {
    if (password === password2) {
      return true;
    } else {
      alert("passwords must be the same!");
      return false;
    }
  }
};
