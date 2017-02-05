window.onload = function(){
  var projects_area = document.querySelector("#projects");
  var add_project = document.querySelector("#add-project");

  add_project.onclick = function(){
    var created_project = document.createElement("section");
    var created_title = document.createElement("h1");
    created_title.innerHTML = "New project";
    var created_addtask = document.createElement("button");
    created_addtask.className = "add-task";
    created_addtask.innerHTML = "Add a new task"

    created_project.appendChild(created_title);
    created_project.appendChild(created_addtask);
    created_project.className = "project animate-add";

    projects_area.appendChild(created_project);
  };
};
