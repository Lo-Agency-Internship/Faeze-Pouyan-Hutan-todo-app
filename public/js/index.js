 function LoadUserTasks()
{
  // const xhttp = new XMLHttpRequest();
  // const _idFromSesion =sessionStorage.setItem("id",xhttp.getResponseHeader("id"));
  const idFromSesion = sessionStorage.getItem("id");
  if(idFromSesion===null)
  {
    window.location.href = "../login.html";
  }
  alert(idFromSesion);
}





// xhttp.onload = () => {
//   switch (xhttp.status) {
//     case 600:
  
//       window.location.href = "../index.html";
//     break;
//     case 700:
      
//       window.location.href = "../login.html"; 
//       alert("Your Are Not Logged in ");
//       break;
//     default:
//       break;
//   }
// };

// xhttp.open("GET", "/index", true);

// xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

// xhttp.send(JSON.stringify(idFromSesion));
