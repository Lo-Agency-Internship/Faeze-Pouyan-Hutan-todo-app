//main selectors
let btn = document.getElementById("add");
let userInput = document.getElementById("todo-input");
let userDate = document.getElementById("todo-date");
let ul = document.getElementById("todos-list");
//add todo
btn.addEventListener("click", function (event) {
  createTOdo();
});
function createTOdo() {
  let li_user = document.createElement("li");
  let div_user = document.createElement("div");
  let user_txt = userInput.value;
  let txt = document.createTextNode(user_txt);
  li_user.append(txt);
  ul.append(li_user);
  let user_date = userDate.value;
  let date = document.createTextNode(user_date);
  div_user.append(date);
  ul.append(div_user);
  let checkBox = document.createElement("input");
  checkBox.classList.add("checkbox");
  checkBox.type = "checkbox";
  let hr = document.createElement("hr");
  li_user.append(checkBox);
  ul.append(hr);
  userInput.value = "";
  userDate.value = "";
}
