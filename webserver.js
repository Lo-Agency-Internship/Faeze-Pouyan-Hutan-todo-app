const { throws } = require("assert");
const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
const utils = require("./utils/utils");

// ===================================================================
// ============    INDEX       =======================================
// ===================================================================

app.post("/:name(index|/)?", function (req, res) {
  const userTasks = req.body;

  // -------------------------------------------
  // ----------read DataBase--------------------
  // -------------------------------------------

  const dataBaseFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/dataBase/dataBase.json"), "utf-8")
  );

  // ------------------------------------------
  // ---find user based on id in session-------
  // ------------------------------------------

  const foundUser = dataBaseFile.find(
    (item) => Number(item.id) === Number(userTasks.id)
  );

  if (foundUser) {
    delete userTasks["id"];

    // ----------------------------------
    // --------Auto Increment------------
    // ----------------------------------

    utils.autoIncremment(
      dataBaseFile[foundUser.id - 1].task,
      Object.values(userTasks)[0]
    );

    dataBaseFile[foundUser.id - 1].task.push(Object.values(userTasks)[0]);
    fs.writeFileSync(
      path.join(__dirname, "dataBase/dataBase.json"),
      JSON.stringify(dataBaseFile)
    );
  }
});
// ===================================================================
// ============    INDEX /  API      =================================
// ===================================================================

app.post("/:name(index|/)?/api", function (req, res) {
  // receive user id from session
  // ----------------------------

  const userIdFromSession = req.body;

  // ----------read DataBase--------------------
  // -------------------------------------------

  const dataBaseFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/dataBase/dataBase.json"), "utf-8")
  );

  // find user from db based on id from session storage
  // --------------------------------------------------
  const UserFound = dataBaseFile.find(
    (item) => Number(item.id) === Number(Object.values(userIdFromSession))
  );

  // save to varialble and send tasks of the found user
  //----------------------------------------------------
  const tasksOfUser = UserFound.task;
  res.status(250).send(tasksOfUser);
});

// ===================================================================
// =====    INDEX / TASK EDIT TO IS DONE /  API      =================
// ===================================================================

app.post("/:name(index|/)?/api/taskEditDone", function (req, res) {
  // receive task id in req body
  // receive user id stored in req body (from session storage)
  // -------------------------------------------------------

  const userAndTaskId = req.body;

  // ----------read DataBase--------------------
  // -------------------------------------------

  const dataBaseFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/dataBase/dataBase.json"), "utf-8")
  );

  // find user from db based on id from session storage stored in req body
  // ---------------------------------------------------------------------
  const UserFound = dataBaseFile.find(
    (item) => Number(item.id) === Number(Object.values(userAndTaskId)[0])
  );

  //if user user is found, edit the related task
  // -------------------------------------------
  if (UserFound) {
    const theTaskToEdit = UserFound.task.find(
      (item) => item.id === Object.values(userAndTaskId)[1]
    );

    theTaskToEdit.isDone = "IS DONE";

    //rewrite the database
    // -------------------
    fs.writeFileSync(
      path.join(__dirname, "dataBase/dataBase.json"),
      JSON.stringify(dataBaseFile)
    );
  }
});

// ===================================================================
// =====    INDEX / TASK EDIT TO NOT DONE /  API      =================
// ===================================================================

app.post("/:name(index|/)?/api/taskEditNotDone", function (req, res) {
  // receive task id in req body
  // receive user id from session storage stored in req body
  // -------------------------------------------------------

  const userAndTaskId = req.body;

  // ----------read DataBase--------------------
  // -------------------------------------------

  const dataBaseFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/dataBase/dataBase.json"), "utf-8")
  );

  // find user from db based on id from session storage stored in req body
  // ---------------------------------------------------------------------
  const UserFound = dataBaseFile.find(
    (item) => Number(item.id) === Number(Object.values(userAndTaskId)[0])
  );

  //if user user is found, edit the related task
  // -------------------------------------------
  if (UserFound) {
    const theTaskToEdit = UserFound.task.find(
      (item) => item.id === Object.values(userAndTaskId)[1]
    );

    theTaskToEdit.isDone = "NOT DONE";

    //rewrite the database
    // -------------------
    fs.writeFileSync(
      path.join(__dirname, "dataBase/dataBase.json"),
      JSON.stringify(dataBaseFile)
    );
  }
});

// ===================================================================
// ============    INDEX / TASK DELETE /  API      ===================
// ===================================================================

app.post("/:name(index|/)?/api/taskDelete", function (req, res) {
  // receive task id in req body
  // receive user id from session storage stored in req body
  // -------------------------------------------------------

  const userAndTaskId = req.body;

  // ----------read DataBase--------------------
  // -------------------------------------------

  const dataBaseFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/dataBase/dataBase.json"), "utf-8")
  );

  // find user from db based on id from session storage stored in req body
  // ---------------------------------------------------------------------
  const UserFound = dataBaseFile.find(
    (item) => Number(item.id) === Number(Object.values(userAndTaskId)[0])
  );

  //if user user is found, delete the related task
  // -------------------------------------------
  if (UserFound) {
    const theTaskToDelete = UserFound.task.find(
      (item) => item.id === Object.values(userAndTaskId)[1]
    );

    index = UserFound.task.findIndex(
      (item) => item.id === Object.values(userAndTaskId)[1]
    );

    UserFound.task.splice(index, 1);

    //rewrite the database
    // -------------------
    fs.writeFileSync(
      path.join(__dirname, "dataBase/dataBase.json"),
      JSON.stringify(dataBaseFile)
    );
  }
});

// ===================================================================
// ============    INDEX / SHOW /  MONTHLY      ======================
// ===================================================================

app.post("/:name(index|/)?/api/show/monthly", function (req, res) {
  res.status(250).send();
});

// ======================================================================
// =====    INDEX / SHOW /  MONTHLY   specificMonth   ===================
// ======================================================================

app.post(
  "/:name(index|/)?/api/show/monthly/specificMonth",
  function (req, res) {
    // receive user id from session storage stored in req body
    // -------------------------------------------------------
    const userIdMonthNumber = req.body;

    // ----------read DataBase--------------------
    // -------------------------------------------

    const dataBaseFile = JSON.parse(
      fs.readFileSync(path.join(__dirname, "/dataBase/dataBase.json"), "utf-8")
    );

    // find user from db based on id from session storage
    // --------------------------------------------------

    const UserFound = dataBaseFile.find(
      (item) => Number(item.id) === Number(Object.values(userIdMonthNumber)[0])
    );

    // save to varialble and send tasks of the found user
    //---------------------------------------------------

    const tasksOfUser = UserFound.task;
    
    let month1 = [];
    let month2 = [];
    let month3 = [];
    let month4 = [];
    let month5 = [];
    let month6 = [];
    let month7 = [];
    let month8 = [];
    let month9 = [];
    let month10 = [];
    let month11 = [];
    let month12 = [];

    tasksOfUser.forEach((item) => {
      switch (Number(item.taskDate.split("-")[1])) {
        case 1:
          month1.push(item);
          break;
        case 2:
          month2.push(item);
          break;
        case 3:
          month3.push(item);
          break;
        case 4:
          month4.push(item);
          break;
        case 5:
          month5.push(item);
          break;
        case 6:
          month6.push(item);
          break;
        case 7:
          month7.push(item);
          break;
        case 8:
          month8.push(item);
          break;
        case 9:
          month9.push(item);
          break;
        case 10:
          month10.push(item);
          break;
        case 11:
          month11.push(item);
          break;
        case 12:
          month12.push(item);
          break;
        default:
          break;
      }
    });
    let monthNum = Number(Object.values(userIdMonthNumber)[1]);
    switch (Number(monthNum)) {
      case 1:
        res.send(month1);
        break;
      case 2:
        res.send(month2);
        break;
      case 3:
        res.send(month3);
        break;
      case 4:
        res.send(month4);
        break;
      case 5:
        res.send(month5);
        break;
      case 6:
        res.send(month6);
        break;
      case 7:
        res.send(month7);
        break;
      case 8:
        res.send(month8);
        break;
      case 9:
        res.send(month9);
        break;
      case 10:
        res.send(month10);
        break;
      case 11:
        res.send(month11);
        break;
      case 12:
        res.send(month12);
        break;
      default:
        break;
    }
  }
);
// ===================================================================
// ============    INDEX / SHOW /  WEEKLY      ===================
// ===================================================================

app.post("/:name(index|/)?/api/show/weekly", function (req, res) {});

// ===================================================================
// ====================     REGISTER     =============================
// ===================================================================

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

    utils.autoIncremment(dataBaseFile, UserSubmitedCredentialsObj);

    // ---------------------------------------
    // ---------CHECK USERNAME FUNC-----------

    let checkUserName = utils.ValidateName(UserSubmitedCredentialsObj.userName);

    // --------------------------------------
    // ----------CHECK Email FUNC------------

    let checkEmail = utils.ValidateEmail(UserSubmitedCredentialsObj.email);

    // -----------------------------------------
    // ----------CHECK Password FUNC------------
    // -----------------------------------------

    let checkPassword = utils.comparePasswords(
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

// ===================================================================
// ====================      LOGIN       =============================
// ===================================================================

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
    res.setHeader("id", foundUserName.id);
    res.status(599).sendFile(path.join(__dirname, "/public", "login.html"));
    return true;
  } else {
    res.status(666).sendFile(path.join(__dirname, "/public", "login.html"));
  }
});

// ===================================================================
// ====================     404     ==================================
// ===================================================================

app.use((req, res) => {
  res.status(404).sendFile("./public/404.html", { root: __dirname });
});

// --------------------------------------------------
// ---------------LISTEN PORT------------------------
// --------------------------------------------------

app.listen(3000, () => {
  console.log("server listening on 3000 port");
});
