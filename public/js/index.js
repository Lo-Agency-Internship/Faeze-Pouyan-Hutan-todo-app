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
    isDone: 0,
  };

  xhttp.open("POST", "/index", true);

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.send(JSON.stringify({ taskObject, id }));
  location.reload();
});

// =============================================================
// =============================================================
// =============================================================


let stateChechBox = false;

function checkedBox(taskID) {
  const checkbox = document.getElementById(`${taskID}`);
  stateChechBox = true;
}

function OnDelete(taskId) {
  let deleteBtn = document.getElementById(`${delbtn}`);
  deleteBtn.value = true;
}

// =========================================================
// ============  SHOW and UPDATE TASKS  ===========================
// ================================================================

function SetSession() {
  const idFromSesion = sessionStorage.getItem("id");
  if (idFromSesion === null) {
    window.location.href = "../login.html";
  } else {
    const xhttp = new XMLHttpRequest();

    /// read db for tasks
    // ==================

    xhttp.onload = () => {
      if ((xhttp.status = 250)) {
        const response = xhttp.responseText;
        const tasks = JSON.parse(response);
        
        const root = document.getElementById("root");

        tasks.forEach((item) => {
          const bodyTask = document.createElement("div");

          bodyTask.setAttribute("id", item.id);

          bodyTask.innerHTML = `<div style="background: linear-gradient(to left, #8a4ce8 0%, #ffffff 100%); border: 1px solid black; border-radius: 5px; margin-top: 10px">
                                    
                                    <input id="task${item.id}" type="checkbox" value="false" onclick="checkedBox(${item.id})">

                                    <div for="${item.id}">

                                        <span><h4>Title: ${item.taskTitle}</h4></span>

                                        <span><strong>Due Date: ${item.taskDate}</strong></span>

                                        <button id="delbtn" onclick="OnDelete(${item.id}) value="false">DELETE</button>

                                    </div>

                                </div>`;
          root.appendChild(bodyTask);
        });
      }
    };
    xhttp.open("POST", "/index/api", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify({idFromSesion}));
  }
}

