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
      return false;
    }
  },

  comparePasswords: (password, password2) => {
    if (password === password2) {
      return true;
    } else {
      return false;
    }
  }
};
