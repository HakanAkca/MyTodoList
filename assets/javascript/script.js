window.onload = function(){
  var delete_button = document.createElement("div");
  delete_button.id = "delete-button";
  delete_button.innerHTML = "Delete";

  var projects_area = document.querySelector("#projects");
  var add_project = document.querySelector("#add-project");
  var add_task_buttons = document.querySelectorAll(".add-task");
  var tasks = document.querySelectorAll(".task");

  /* TRIGGERS */

  // Add project button
  add_project.onclick = function(){
    addProject();
  };

  // Add task buttons on each project

  function setClickTaskTriggers(){
    for(var i = 0; i < tasks.length; i++){
      tasks[i].onclick = function(){
        var span = this.getElementsByTagName("span")[0];
        span.setAttribute("contentEditable", true);
      }
    }
  }
  setClickTaskTriggers();

  function setAddtaskTriggers(){
    add_task_buttons = document.querySelectorAll(".add-task");
    for(var i = 0; i < add_task_buttons.length; i++){
      add_task_buttons[i].onclick = function(){
        addTask(this);
      }
    }
  }
  setAddtaskTriggers();

  // On hover task
  function setHoverTaskTriggers(){
    for(var i = 0; i < tasks.length; i++){
      tasks[i].onmouseover = function(){
        this.appendChild(delete_button);
        delete_button.className = "delete-button animate-del-button";
      }
      tasks[i].onmouseout = function(){
        if(getCurrentHoverId() !== "delete-button" && getCurrentHoverId() !== this.id){
          this.removeChild(delete_button);
        }
      }
    }
  }
  setHoverTaskTriggers();

  delete_button.onclick = function(){
    this.parentElement.parentElement.removeChild(this.parentElement);
  }

  /* FUNCTIONS */
  function getCurrentHoverId(){
    var hovered = document.querySelectorAll(":hover");
    return hovered[hovered.length-1].id;
  }
  function addProject(){
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
    setAddtaskTriggers();
  }
  function addTask(e){
    console.log("Added task");
    var created_task = document.createElement("div");
    created_task.className = "task animate-add";
    created_task.innerHTML = "New task";

    e.parentElement.appendChild(created_task);
    tasks = document.querySelectorAll(".task");
    setHoverTaskTriggers();
  }
};
