function SetSession() {
  const idFromSesion = sessionStorage.getItem("id");
  if (idFromSesion === null) {
    window.location.href = "../login.html";
  }
}

const saveTaskButton = document.getElementById("saveTask");

saveTaskButton.addEventListener('click',(e)=>
{
  e.preventDefault();
  const xhttp = new XMLHttpRequest();
  const taskTitle = document.getElementById("task").value;
  const taskDate = document.getElementById("date").value;

  const taskObject = {
    taskTitle,
    taskDate,
  };

console.log(Object.values(taskObject));

  xhttp.open("POST", "/index", true);

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.send(JSON.stringify(taskObject));
})
