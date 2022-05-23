const { throws } = require("assert");
const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const { isStringObject } = require("util/types");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
// --------------------------------------------------
// ----------- INDEX --------------------------------

app.get("/", function (req, res) {
  let name = __dirname + "/public/" + "index.html";
  res.sendFile(name);
});

app.get("/index", function (req, res) {
  res.sendFile(path.join(__dirname, "/public", "index.html"));
});

// --------------------------------------------------
// ----------- REGISTER -----------------------------

app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "/public", "register.html"));
});

app.post("/register", function (req, res) {
  const UserSubmitedCredentialsObj = req.body;

  console.log(UserSubmitedCredentialsObj);
  
  const dataBaseFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/dataBase/dataBase.json"), "utf-8")
  );

  const foundUser = dataBaseFile.find(
    (item) => item.userName === UserSubmitedCredentialsObj.userName
  );
  
    if (foundUser) {
      res.status(499).sendFile(path.join(__dirname, "/public", "register.html"));
    }
    else {
      dataBaseFile.push(UserSubmitedCredentialsObj);
      fs.writeFileSync(
        path.join(__dirname, "dataBase/dataBase.json"),
        JSON.stringify(dataBaseFile)
      );
      res.redirect("/index");
    }
});

// --------------------------------------------------
// ----------- LOGIN --------------------------------

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "/public", "login.html"));
});

app.post("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "/public", "login.html"));
});

// --------------------------------------------------
// -------------Data Base Operations-----------------

app.get("/dataBaseOperations", function (req, res) {
  const dataBaseFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/dataBase/dataBase.json"), "utf-8")
  );
  res.json(dataBaseFile);
});

app.post("/dataBaseOperations", function (req, res) {
  const dataBaseFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/dataBase/dataBase.json"), "utf-8")
  );
});

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
