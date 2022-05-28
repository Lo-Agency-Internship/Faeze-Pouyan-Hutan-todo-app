// =============================================================
// ==================    LOGOUT        =========================
// =============================================================
const btnLogout = document.getElementById("btnLogout");
btnLogout.addEventListener("click", (e) => {
  e.preventDefault();
  sessionStorage.removeItem("id");
  location.reload();
});

// =============================================================
// ==================    SAVE TASKS    =========================
// =============================================================

const saveTaskButton = document.getElementById("saveTask");

saveTaskButton.addEventListener("click", (e) => {
  e.preventDefault();

  const xhttp = new XMLHttpRequest();
  const taskTitle = document.getElementById("task").value;
  const taskDate = document.getElementById("date").value;
  const id = sessionStorage.getItem("id");

  const taskObject = {
    taskTitle,
    taskDate,
    isDone: "NOT DONE",
  };

  xhttp.open("POST", "/index", true);

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.send(JSON.stringify({ taskObject, id }));
  location.reload();
});

// =============================================================
// ===   SHOW TASKS BASES ON SESSION STORAGE ID OF USER   =====
// =============================================================

function SetSession() {
  const idFromSesion = sessionStorage.getItem("id");
  if (idFromSesion === null) {
    window.location.href = "../login.html";
  } else {
    const xhttp = new XMLHttpRequest();

    // read db for tasks
    // ------------------

    xhttp.onload = () => {
      if ((xhttp.status = 250)) {
        const response = xhttp.responseText;

        const tasks = JSON.parse(response);

        const root = document.getElementById("root");

        tasks.forEach((item) => {
          const bodyTask = document.createElement("div");

          bodyTask.setAttribute("id", item.id);

          bodyTask.innerHTML = `<div style="background: linear-gradient(to left, #8a4ce8 0%, #ffffff 100%); border: 1px solid black; border-radius: 5px; margin-top: 10px">
                                    <div for="${item.id}">
                                    
                                        <span><h4>Title: ${item.taskTitle}</h4></span>
                                    
                                        <p><strong> current status is: ${item.isDone}</strong></p>
                                        <button id="task${item.id}" onclick="checkedBoxDone(${item.id})">change into: DONE</button>
                                        <button id="task${item.id}" onclick="checkedBoxNotDone(${item.id})">change into: NOT DONE</button>
                                        <br>
                                        <br>
                                        <span class="dates">Due Date: ${item.taskDate}</span>
                                        <br>
                                        <br>
                                        <button id="delbtn" onclick="OnDelete(${item.id})" value="false">DELETE</button>

                                    </div>

                                </div>`;
          root.appendChild(bodyTask);
        });
      }
    };

    xhttp.open("POST", "/index/api", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify({ idFromSesion }));
  }
}

// =============================================================
// ========    EDIT TASKS to IS DONE   =========================
// =============================================================

function checkedBoxDone(taskID) {
  // set user id from session
  const idFromSesion = sessionStorage.getItem("id");

  // save id of task to be changed
  let CheckThisTaskId = taskID;

  // check if user is logged in
  if (idFromSesion === null) {
    window.location.href = "../login.html";
  }
  // send id of user and id of task to data base
  else {
    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/index/api/taskEditDone", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify({ idFromSesion, CheckThisTaskId }));
    location.reload();
  }
}

// =============================================================
// ========    EDIT TASKS to IS NOT DONE   =====================
// =============================================================

function checkedBoxNotDone(taskID) {
  // set user id from session
  const idFromSesion = sessionStorage.getItem("id");

  // save id of task to be changed
  let CheckThisTaskId = taskID;

  // check if user is logged in
  if (idFromSesion === null) {
    window.location.href = "../login.html";
  }
  // send id of user and id of task to data base
  else {
    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/index/api/taskEditNotDone", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify({ idFromSesion, CheckThisTaskId }));
    location.reload();
  }
}

// =============================================================
// =================  DELETE TASKS  ============================
// =============================================================

function OnDelete(taskId) {
  // set user id from session
  const idFromSesion = sessionStorage.getItem("id");

  // save id of task to be changed
  let DeleteThisTaskId = taskId;

  // check if user is logged in
  if (idFromSesion === null) {
    window.location.href = "../login.html";
  }
  // send id of user and id of task to data base
  else {
    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/index/api/taskDelete", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify({ idFromSesion, DeleteThisTaskId }));
    location.reload();
  }
}

// ===================================================================
// =================  Filter TASKS MONTHLY ============================
// ===================================================================

function monthly() {
  // set user id from session
  const idFromSesion = sessionStorage.getItem("id");

  // check if user is logged in
  if (idFromSesion === null) {
    window.location.href = "../login.html";
  } else {
    const xhttp = new XMLHttpRequest();

    // show user options from month 1 to 12 and send the number to server
    // ------------------------------------------------------------------
    xhttp.onload = () => {
      if ((xhttp.status = 250)) {
        const rootTop = document.getElementById("rootTop");
        for (let index = 1; index <= 12; index++) {
          const filteredMonths = document.createElement("div");
          filteredMonths.innerHTML = `<div>
                                       <button onclick="inSideMonth(${index})">
                                       MONTH:${index}
                                       </button>
                                       <div>
                                       </div>
                                     </div>`;
          rootTop.appendChild(filteredMonths);
        }
      }
    };
    xhttp.open("POST", "/index/api/show/monthly", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify({ idFromSesion }));
  }
}

// ===================================================================
// =================  TASKS inside MONTHs ============================
// ===================================================================

function inSideMonth(number) {
  // set user id from session
  const idFromSesion = sessionStorage.getItem("id");

  const element = document.querySelector(".tasksOfMonth");
  
  if(element){
    for (let index = 0; index < element.length; index++) {
      element[index].removeItem(); 
    }
  }


  // index of month
  let month = number;

  // check if user is logged in
  if (idFromSesion === null) {
    window.location.href = "../login.html";
  }
  // send id of user and number of month
  else {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = () => {
      if (true) {
        const monthTasks = xhttp.responseText;
        console.log("a", monthTasks);
        const calendarTop = document.getElementById("calendarTop");
        JSON.parse(monthTasks).forEach((element) => {
          const filteredTasks = document.createElement("div");
          filteredTasks.innerHTML = `<div class="tasksOfMonth">
                                          <hr>
                                          <div>
                                            Task title:${element.taskTitle}
                                          </div>
                                          <hr>
                                          <div>
                                            Task due date:${element.taskDate}
                                          </div>
                                          <hr>
                                          <div>
                                            Task status:${element.isDone}
                                          </div>
                                          <hr>
                                     </div>`;
          calendarTop.appendChild(filteredTasks);
        });
      }
    };

    xhttp.open("POST", "/index/api/show/monthly/specificMonth", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify({ idFromSesion, month }));
  }
}

// ===================================================================
// =================  Filter TASKS WEEKLY ============================
// ===================================================================

function weekly() {
  // set user id from session
  const idFromSesion = sessionStorage.getItem("id");

  // check if user is logged in
  if (idFromSesion === null) {
    window.location.href = "../login.html";
  } else {
    const xhttp = new XMLHttpRequest();
    // read db for tasks
    // ------------------
    xhttp.onload = () => {};

    xhttp.open("POST", "/index/api/show/monthly", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify({ idFromSesion }));
    location.reload();
  }
}
