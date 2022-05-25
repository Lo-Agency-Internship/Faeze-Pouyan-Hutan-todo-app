const { throws } = require("assert");
const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const { isStringObject } = require("util/types");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
const conditions = require("./utils/registerCredentialsFunctions");
// ----------------------------------------------------------------
// ----------- INDEX ----------------------------------------------
// ----------------------------------------------------------------

app.get("/", function (req, res) {
  
   const idFromSesion = req.body;
 console.log(idFromSesion);
  // -------------------------------------------
  // ----------read DataBase--------------------
  // -------------------------------------------

  const dataBaseFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/dataBase/dataBase.json"), "utf-8")
  );

  // const foundId = dataBaseFile.find(
  //   (item) => item.id === sessionStorage.getItem("id")
  // );

//   if(foundId)
// {
//   res.statusCode(600).sendFile(path.join( __dirname + "/public/" + "index.html"));
// }
// else
// {
//   res.statusCode(700).sendFile(path.join( __dirname + "/public/" + "login.html"));
// }


});

app.get("/index", function (req, res) {

    const idFromSesion = req.body;
    console.log(idFromSesion);
  // -------------------------------------------
  // ----------read DataBase--------------------
  // -------------------------------------------

  const dataBaseFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/dataBase/dataBase.json"), "utf-8")
  );

//   const foundId = dataBaseFile.find(
//     (item) => item.id === sessionStorage.getItem("id")
//   );

//   if(foundId)
// {
//   res.statusCode(600).sendFile(path.join( __dirname + "/public/" + "index.html"));
// }
// else
// {
//   res.statusCode(700).sendFile(path.join( __dirname + "/public/" + "login.html"));
// }


});

// ----------------------------------------------------------------
// ----------- REGISTER -------------------------------------------
// ----------------------------------------------------------------

app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "/public", "register.html"));
});

app.post("/register", function (req, res) {
  const UserSubmitedCredentialsObj = req.body;

  // -------------------------------------------
  // ----------read DataBase--------------------
  // -------------------------------------------

  const dataBaseFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/dataBase/dataBase.json"), "utf-8")
  );

  // -------------------------------------------
  // ----search for userName occurances---------
  // ---if not found send 499 status to register
  // ---if found go to Auto Increment ID then---
  // ---RUN userName, email and password functions
  // ---if false return 666 status--------------
  // ---if true push user credentials to database

  const foundUser = dataBaseFile.find(
    (item) => item.userName === UserSubmitedCredentialsObj.userName
  );

  if (foundUser) {
    res.status(499).sendFile(path.join(__dirname, "/public", "register.html"));
    return false;
  } else {
    // ----------------------------------
    // --------Auto Increment------------

    conditions.autoIncremment(dataBaseFile, UserSubmitedCredentialsObj);

    // ---------------------------------------
    // ---------CHECK USERNAME FUNC-----------

    let checkUserName = conditions.ValidateName(
      UserSubmitedCredentialsObj.userName
    );

    // --------------------------------------
    // ----------CHECK Email FUNC------------

    let checkEmail = conditions.ValidateEmail(UserSubmitedCredentialsObj.email);

    // -----------------------------------------
    // ----------CHECK Password FUNC------------
    // -----------------------------------------

    let checkPassword = conditions.comparePasswords(
      UserSubmitedCredentialsObj.passWord1,
      UserSubmitedCredentialsObj.passWord2
    );

    // -----------------------------------------
    // ------------CHECK CONDITIONS-------------
    // -----------------------------------------

    if (!checkUserName || !checkEmail || !checkPassword) {
      res
        .status(666)
        .sendFile(path.join(__dirname, "/public", "register.html"));
    } else {
      // --------------------------------------
      // ------------PUSH data-----------------
      // --------------------------------------

      delete UserSubmitedCredentialsObj["passWord2"];
      dataBaseFile.push(UserSubmitedCredentialsObj);
      fs.writeFileSync(
        path.join(__dirname, "dataBase/dataBase.json"),
        JSON.stringify(dataBaseFile)
      );
      res
        .status(304)
        .sendFile(path.join(__dirname, "/public", "register.html"));
    }
  }
});

// ----------------------------------------------------------------
// ----------- LOGIN ----------------------------------------------
// ----------------------------------------------------------------

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "/public", "login.html"));
});

app.post("/login", function (req, res) {
  
  // received user input in login page
  // -----------------------------------
  const UserSubmitedCredentialsObj = req.body;

  // -------------------------------------------
  // ----------read DataBase--------------------
  // -------------------------------------------

  const dataBaseFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/dataBase/dataBase.json"), "utf-8")
  );

  // -------------------------------------------
  // search for username and password in database
  // -------------------------------------------

  const foundUserName = dataBaseFile.find(
    (item) => item.userName === UserSubmitedCredentialsObj.userName
  );
  const foundPassword = dataBaseFile.find(
    (item) => item.passWord1 === UserSubmitedCredentialsObj.passWord1
  );
  
  if (foundUserName && foundPassword) {
    // res.status(499).sendFile(path.join(__dirname, "/public", "index.html"));
  //   res.set({
  //     'content-type': 'application/json',
  //     'id': foundUserName.id
  //  }).status(499).sendFile(path.join(__dirname, "/public", "index.html"));
  res.setHeader("id",foundUserName.id);
  res.status(599).sendFile(path.join(__dirname, "/public", "login.html"))
    return true;
  } else {
    res.status(666).sendFile(path.join(__dirname, "/public", "login.html"));
  }
});

// --------------------------------------------------
// -------------Data Base Operations-----------------

// app.get("/dataBaseOperations", function (req, res) {
//   const dataBaseFile = JSON.parse(
//     fs.readFileSync(path.join(__dirname, "/dataBase/dataBase.json"), "utf-8")
//   );
//   res.json(dataBaseFile);
// });

// app.post("/dataBaseOperations", function (req, res) {
//   const dataBaseFile = JSON.parse(
//     fs.readFileSync(path.join(__dirname, "/dataBase/dataBase.json"), "utf-8")
//   );
// });

// --------------------------------------------------
// --------------------------------------------------

//

// --------------------------------------------------
// ---------------404 PAGE---------------------------

app.use((req, res) => {
  res.status(404).sendFile("./public/404.html", { root: __dirname });
});

// --------------------------------------------------
// ---------------LISTEN PORT------------------------

app.listen(3000, () => {
  console.log("server listening on 3000 port");
});
