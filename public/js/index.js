// =============================================================
// ==================    LOGOUT        =========================
// =============================================================
const btnLogout= document.getElementById("btnLogout");
btnLogout.addEventListener('click',(e)=>
{
  e.preventDefault();
  sessionStorage.removeItem("id");
  location.reload();

})


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
    xhttp.onload = () => {
      if ((xhttp.status = 250)) {
        const response = xhttp.responseText;

        const tasks = JSON.parse(response);

        tasks.forEach((item) => {
          console.log(item.taskDate)
        });
      }
    };
    xhttp.open("POST", "/index/api/show/weekly", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify({ idFromSesion }));
  }
}

// ===================================================================
// =================  Filter TASKS MONTHLY ===========================
// ===================================================================

function monthly() {
  // set user id from session
  const idFromSesion = sessionStorage.getItem("id");

  // check if user is logged in
  if (idFromSesion === null) {
    window.location.href = "../login.html";
  } else {
    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/index/api/show/monthly", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify({ idFromSesion }));
    location.reload();
  }
}
