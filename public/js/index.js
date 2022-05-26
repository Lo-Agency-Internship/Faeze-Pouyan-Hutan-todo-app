let stateChechBox = false;

function checkedBox(taskID) {
  const checkbox = document.getElementById(`${taskID}`);
  stateChechBox=true;

}


function OnDelete(taskId)
{
  let deleteBtn=document.getElementById(`${delbtn}`)
deleteBtn.value=true;
}

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


        const root = document.getElementById("root");
        
        tasks.forEach((item) => {

          const bodyTask= document.createElement("div")

          bodyTask.setAttribute("id",item.id)

    
      bodyTask.innerHTML=`<div class="task d-flex align-content-center align-self-center ">
                      <input id="task${item.id}" 
                      
                      class="form-check-input me-1" 

                      type="checkbox" value="false"

                       onclick="checkedBox(${item.id})"
            
                        aria-label="...">

                      <div for="${item.id}" class="d-flex">

                        <span><strong>Title:</strong></span>

                        <div class="task-title mx-1">

                        ${item.taskTitle}

                        </div>

                        <span><strong>Due Date:</strong></span>

                        <div class="task-due mx-1" >

                          <span>${item.taskDate} -</span>
                                   
                        </div>

                        <button id="delbtn" onclick="OnDelete(${item.id}) value="false" > DELETE</button>

                      </div>
                    </div>`
                    root.appendChild(bodyTask);

         });
    
        }
      };
    xhttp.open("POST", "/index/api", true);

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify({  idFromSesion   }),stateChechBox);
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
  location.reload();
});
