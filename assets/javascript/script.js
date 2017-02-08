window.onload = function(){

  // Init local storage if empty.
  if(localStorage.getItem('projects') === null){
    localStorage.setItem('projects',"[]");
  }
  var projects = [];

  // Create delete buttons
  var delete_button = document.createElement("div");
  delete_button.className = "delete_button";
  delete_button.id = "delete-button";

  var delete_button_project = document.createElement("div");
  delete_button_project.className = "delete_button";
  delete_button_project.id = "delete-button-project";

  // Selector variables
  var projects_area = document.querySelector("#projects");
  var add_project_button = document.querySelector("#add-project");
  var add_task_buttons = document.querySelectorAll(".add-task");
  var tasks = document.querySelectorAll(".task");
  var project_names = document.querySelectorAll(".project h1");
  var clear_local_button = document.querySelector("#clear-local");

  /* === TRIGGERS === */

  add_project_button.onclick = function(){
    addProject();
  };

  function setClickProjectTriggers(){
    project_names = document.querySelectorAll(".project h1");
    for(var i = 0; i < project_names.length; i++){
      project_names[i].onclick = function(){
        this.setAttribute("contentEditable", true);

        this.addEventListener("keypress", function(event) {
          if (event.keyCode == 13) {
            event.preventDefault();

            if(this.innerHTML !== ""){
              var projects = [];
              projects = JSON.parse(localStorage.getItem('projects'));
              var projectId_temp = this.parentElement.id.split("_");
              var projectId = projectId_temp[1];

              projects[projectId].name = this.innerHTML;

              localStorage.setItem('projects', JSON.stringify(projects));
              this.setAttribute("contentEditable", false);
            }
          }
        });
      }
    }
  }
  function setClickTaskTriggers(){
    tasks = document.querySelectorAll(".task");
    for(var i = 0; i < tasks.length; i++){
      tasks[i].onclick = function(){
        var span = this.getElementsByTagName("span")[0];
        span.setAttribute("contentEditable", true);

        span.addEventListener("keypress", function(event) {
          if (event.keyCode == 13) {
            event.preventDefault();
            var projects = [];
            projects = JSON.parse(localStorage.getItem('projects'));
            var taskRawId = this.parentElement.id.split("_");
            var projectId = taskRawId[1];
            var taskId = taskRawId[2];

            projects[projectId].tasks[taskId] = this.innerHTML;

            localStorage.setItem('projects', JSON.stringify(projects));
            span.setAttribute("contentEditable", false);
          }
        });
      }
    }
  }
  setClickTaskTriggers();

  // On click add task buttons on each project
  function setAddtaskTriggers(){
    add_task_buttons = document.querySelectorAll(".add-task");
    for(var i = 0; i < add_task_buttons.length; i++){
      add_task_buttons[i].onclick = function(){
        console.log(this.parentElement.id)
        addTask(this);
      }
    }
  }

  delete_button.onclick = function(){
    this.parentElement.parentElement.removeChild(this.parentElement);

    var projects = [];
    projects = JSON.parse(localStorage.getItem('projects'));
    var taskRawId = this.parentElement.id.split("_");
    var projectId = taskRawId[1];
    var taskId = taskRawId[2];

    projects[projectId].tasks.splice(taskId,1);

    localStorage.setItem('projects', JSON.stringify(projects));
  }
  delete_button_project.onclick = function(){
    this.parentElement.parentElement.removeChild(this.parentElement);

    var projects = [];
    projects = JSON.parse(localStorage.getItem('projects'));
    var projectId_temp = this.parentElement.id.split("_");
    var projectId = projectId_temp[1];

    projects.splice(projectId,1);

    localStorage.setItem('projects', JSON.stringify(projects));
  }

  /* === FUNCTIONS === */
  function getCurrentHoverId(){
    var hovered = document.querySelectorAll(":hover");
    return hovered[hovered.length-1].id;
  }

  // Add new project
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
    created_project.id = "project_"+nbProjects();

    projects_area.appendChild(created_project);
    setAddtaskTriggers();

    var projectData = {
      'name' : 'New project',
      'tasks' : [
      ],
    };
    var projects = [];
    projects = JSON.parse(localStorage.getItem('projects'));
    projects.push(projectData);
    localStorage.setItem('projects', JSON.stringify(projects));

    setClickProjectTriggers();
    setHoverProjectTriggers();
    setDroppableProjects();
  }

  function nbProjects(){
    var projects = [];
    projects = JSON.parse(localStorage.getItem('projects'));
    return projects.length;
  }

  function addTask(e){
    var created_task = document.createElement("div");
    created_task.className = "task animate-add";
    created_task.innerHTML = "<span>New task</span>";

    var projectId_temp = e.parentElement.id.split("_");
    var projectId = projectId_temp[1];
    var nOfTasks = e.parentElement.getElementsByClassName("task").length;
    created_task.id = "task_"+projectId+"_"+nOfTasks;

    e.parentElement.appendChild(created_task);
    setClickTaskTriggers();

    // Adding to local storage
    var projects = [];
    projects = JSON.parse(localStorage.getItem('projects'));
    projects[projectId].tasks.push(created_task.innerHTML);
    localStorage.setItem('projects', JSON.stringify(projects));
    //
    setHoverTaskTriggers();
    setDraggableTasks();
  }
  function setHoverTaskTriggers(){
    tasks = document.querySelectorAll(".task");
    for(var i = 0; i < tasks.length; i++){
      tasks[i].onmouseover = function(){
        this.appendChild(delete_button);
        delete_button.className = "delete-button";
      }
      tasks[i].onmouseout = function(){
        if(getCurrentHoverId() !== "delete-button" && getCurrentHoverId() !== this.id){
          this.removeChild(delete_button);
        }
      }
    }
  }
  function setHoverProjectTriggers(){
    project_items = document.querySelectorAll(".project");
    for(var i = 0; i < project_items.length; i++){
      project_items[i].onmouseover = function(){
        this.appendChild(delete_button_project);
        delete_button_project.className = "delete-button";
      }
      project_items[i].onmouseout = function(){
        if(getCurrentHoverId() !== "delete-button-project" && getCurrentHoverId() !== this.id){
          this.removeChild(delete_button_project);
        }
      }
    }
  }
  function setDraggableTasks(){
    tasks = document.querySelectorAll(".task");
    for(var i = 0; i < tasks.length; i++){
      tasks[i].draggable = true;

      tasks[i].ondragstart = function(e){
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData("Text", e.target.id);
      }
    }
  }
  function setDroppableProjects(){
    projects_list = document.querySelectorAll(".project");
    for(var i = 0; i < projects_list.length; i++){
      projects_list[i].ondragenter = function(e){
        this.classList.add("drag_enter");
        var data = e.dataTransfer.getData("Text");
        console.log(data);
      }
      projects_list[i].ondragleave = function(){
        this.classList.remove("drag_enter");
      }

      projects_list[i].ondrop = function(){
        ev.preventDefault();
        console.log("Dropped");
      }
    }
  }

  function hydrateProjects(){
    projects = JSON.parse(localStorage.getItem('projects'));
    for(var i = 0; i < projects.length; i++){
      var created_project = document.createElement("section");
      var created_title = document.createElement("h1");
      created_title.innerHTML = projects[i].name;
      var created_addtask = document.createElement("button");
      created_addtask.className = "add-task";
      created_addtask.innerHTML = "Add a new task"

      created_project.appendChild(created_title);
      created_project.appendChild(created_addtask);
      created_project.className = "project";
      created_project.id = "project_"+i;

      for(var j = 0; j < projects[i].tasks.length; j++){
        var created_task = document.createElement("div");
        created_task.className = "task";
        created_task.innerHTML = "<span>"+projects[i].tasks[j]+"</span>";
        created_task.id = "task_"+created_project.id.split("_")[1]+"_"+j;
        created_project.appendChild(created_task);
      }
      projects_area.appendChild(created_project);
    }
    setHoverTaskTriggers();
  }

  setHoverTaskTriggers();
  hydrateProjects();
  setAddtaskTriggers();
  setClickTaskTriggers();
  setClickProjectTriggers();
  setHoverProjectTriggers();
  setDraggableTasks();
  setDroppableProjects();
};
