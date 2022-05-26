// const res = require("express/lib/response");

function SetSession() {
  const idFromSesion = sessionStorage.getItem("id");
  if (idFromSesion === null) {
    window.location.href = "../login.html";
  } else {
    const xhttp = new XMLHttpRequest();
    /// read db for tasks
    xhttp.onload = () => {
      if ((xhttp.status = 250)) {
        const response = xhttp.responseText;
        console.log(response);

        const tasks = JSON.parse(response);
        console.log(tasks);

        const taskName = document.getElementById('tasksTitleFromDB')
        const taskDate = document.getElementById('tasksDateFromDB')
        const taskIsDone = document.getElementById('tasksIsDone')
        const taskCheckBox =  document.getElementById('tasksIsDone')
        const deleteTask =  document.getElementById('deleteTask')
        
        tasks.forEach(item => {
          const _taskName = document.createElement("p");
          _taskName.innerHTML = `task title: ${item.taskTitle}`
          taskName.appendChild(_taskName);

          const _taskDate = document.createElement("p");
          _taskDate.innerHTML = `task Date: ${item.taskDate}`
          taskDate.appendChild(_taskDate);

          const _taskIsDone = document.createElement("input");
          _taskIsDone.innerHTML = `task status: ${item.isDone}`
          taskIsDone.appendChild(_taskIsDone);

          const _taskCheckBox = document.createElement("input");
          _taskCheckBox.setAttribute("type", "checkbox")
          _taskIsDone.innerHTML = `s`
          taskCheckBox.appendChild(_taskCheckBox);

          const _deleteTask = document.createElement("input");
          _deleteTask.setAttribute("type", "button")
          deleteTask.appendChild(_deleteTask);
        });
        
        // console.log(task.taskTitle);
        // console.log(task.taskDate);

        // const taskTile = Object.values(JSON.parse(task))[0];
        // console.log(taskTile);
        // const taskDate = Object.values(JSON.parse(task))[1];
        // let taskIsDone = Object.values(JSON.parse(task))[2];

        // console.log(Object.values(JSON.parse(task)));
        //   if (Number(taskIsDone) === 0) {
        //     taskIsDone = "Not Done";
        //   } else {
        //     taskIsDone = "Done";
        //   }
        //   document.querySelector(
        //     "#tasksTitleFromDB"
        //   ).innerHTML = `Task Title: ${taskTile}`;
        //   document.querySelector(
        //     "#tasksDateFromDB"
        //   ).innerHTML = `Task Due Date: ${taskDate}`;
        //   document.querySelector(
        //     "#tasksIsDoneLabel"
        //   ).innerHTML = `Task Status: ${taskIsDone}`;
      }
    };

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
    isDone: 0,
  };

  xhttp.open("POST", "/index", true);

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.send(JSON.stringify({ taskObject, id }));
});
