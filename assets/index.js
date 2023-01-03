let userInput = document.querySelector(".tasks-input");
let tasksList = document.querySelector(".todos-tasks");
let delBtn = document.querySelector(".del-btn");

//get local storage
let todos = JSON.parse(localStorage.getItem("todos-list"));

delBtn.addEventListener("click", () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todos-list", JSON.stringify(todos));
    showTask()
});

let taskId;
let isEditTask = false;

let filterData = document.querySelectorAll(".filter-div span");

filterData.forEach((span) => {
    span.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        span.classList.add("active");
        showTask(span.id);
    });
});

//edit task
function itemEdit(id, oldTask) {
    isEditTask = true;
    ediTaskId = id;
    userInput.value = oldTask;
}

function itemDelete(itemId) {
    console.log(itemId);
    todos.splice(itemId, 1);
    localStorage.setItem("todos-list", JSON.stringify(todos));
    //set local storage
    console.log(todos);
    showTask();
}

function statusUpdate(item) {
    let tasks = item.parentElement.lastElementChild;
    if (item.checked) {
        tasks.classList.add("active");
        todos[item.id].status = "complete";
    } else {
        tasks.classList.remove("active");
        todos[item.id].status = "pending";
    }
    localStorage.setItem("todos-list", JSON.stringify(todos));
}

function showTask(taskStatus) {
    li = "";
    if (todos) {
        todos.forEach((tasks, id) => {
            let completestatus = tasks.status == "complete" ? "active" : "";
            let completeStatusCheck = tasks.status == "complete" ? "checked" : "";
            if (taskStatus == tasks.status || taskStatus == "all") {
                li +=
                    `
            <li class="todos-item">
            <label for="${id}" >
                <input type="checkbox" id="${id}" onclick="statusUpdate(this)" ${completeStatusCheck}>
                <p class="todo-task ${completestatus}">${tasks.task}</p>  
            </label>
            <div class="icon-box">
                <i class="fa-solid fa-pen-to-square" onclick="itemEdit(${id}, '${tasks.task}')"></i>
                <i class="fa-solid fa-trash-can" onclick="itemDelete(${id})"></i>
            </div>
        </li>
        <hr>
            `;
            }
        });
        tasksList.innerHTML = li || `<p class="empty-task"> There is no tasks to show!</p>`;
    }
};

showTask("all");
userInput.addEventListener("keyup", (e) => {
    userValue = userInput.value.trim();
    if (e.key == "Enter" && userValue) {
        if (isEditTask) {
            todos[ediTaskId].task = userValue;
            ediTaskId;
            isEditTask = false;
        } else {
            if (!todos) {
                todos = [];
            }
            let userTasks = { task: userValue, status: "pending" };
            todos.push(userTasks);
        }
        userInput.value = "";
        localStorage.setItem("todos-list", JSON.stringify(todos));
        showTask("all");
    };
});