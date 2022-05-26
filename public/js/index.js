function SetSession() {
  const idFromSesion = sessionStorage.getItem("id");
  if (idFromSesion === null) {
    window.location.href = "../login.html";
  } else {
    const xhttp = new XMLHttpRequest();
    /// read db for tasks
    xhttp.onload= () => {
      if (xhttp.status=250){
        const response = xhttp.responseText;
      }
    }

    xhttp.open("POST", "/index/api", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify({ idFromSesion }));
  }
}

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
    isDone: 0
  };

  xhttp.open("POST", "/index", true);

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.send(JSON.stringify({ taskObject, id }));
});
