window.onload = function(){

  if(localStorage.getItem('projects') === null){
    localStorage.setItem('projects',"[]");
  }
  var projects = [];

  var delete_button = document.createElement("div");
  delete_button.id = "delete-button";
  delete_button.innerHTML = "Delete";

  var projects_area = document.querySelector("#projects");
  var add_project = document.querySelector("#add-project");
  var add_task_buttons = document.querySelectorAll(".add-task");
  var tasks = document.querySelectorAll(".task");

  /* === TRIGGERS === */

  document.querySelector("#clear-local").onclick = function(){
    localStorage.removeItem("projects");
  };
  document.querySelector("#show-local").onclick = function(){
    console.log(localStorage.projects);
  };
  // Add project button
  add_project.onclick = function(){
    addProject();
  };

  // On click task
  function setClickTaskTriggers(){
    for(var i = 0; i < tasks.length; i++){
      tasks[i].onclick = function(){
        var span = this.getElementsByTagName("span")[0];
        span.setAttribute("contentEditable", true);
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
  }

  // Add new task
  function nbProjects(){
    var projects = [];
    projects = JSON.parse(localStorage.getItem('projects'));
    return projects.length;
  }
  nbProjects();
  function addTask(e){
    var created_task = document.createElement("div");
    created_task.className = "task animate-add";
    created_task.innerHTML = "New task";

    e.parentElement.appendChild(created_task);
    tasks = document.querySelectorAll(".task");
    // Adding to local storage
    var projects = [];
    projects = JSON.parse(localStorage.getItem('projects'));
    var projectId_temp = e.parentElement.id.split("_");
    var projectId = projectId_temp[1];
    projects[projectId].tasks.push(created_task.innerHTML);
    localStorage.setItem('projects', JSON.stringify(projects));
    //
    setHoverTaskTriggers();
  }

  function setHoverTaskTriggers(){
    tasks = document.querySelectorAll(".task");
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
        created_task.innerHTML = projects[i].tasks[j];
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
};
