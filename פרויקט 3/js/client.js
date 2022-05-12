let indexUser = 0
let currentUser = 0;
let index = 0
let indexChange = 0



//sign-up
function signUp(ev) {
    ev.preventDefault();

    let name = document.getElementById("sign-up-name").value;
    let password = document.getElementById("sign-up-password").value;
    if (!/^[a-z ]{3,20}$/i.test(name)) {
        alert('The name must be more than 3 lowercase letters');
        return 
    }

    if (!/^\w{4,8}$/.test(password))  {
        alert('The code should be between 4-8 characters');
        return 
    }

    let fajax = new FAJAX()
    fajax.open("POST", "add-user", { userName: name, userPassword: password, tasks: [] });
    let result = fajax.send();

    if (result.message == 200) {
        currentUser=result.thisUser;
        goToList();
        print();
    }
    else {
        alert("you have to sign in")
    }
}

//sign-in
function signIn() {
    let name = document.getElementById("sign-in-name").value;
    let password = document.getElementById("sign-in-password").value;
    
    if (!/^[a-z ]{3,20}$/i.test(name)) {
        alert('The name must be more than 3 lowercase letters');
        return 
    }

    if (!/^\w{4,8}$/.test(password))  {
        alert('The code should be between 4-8 characters');
        return 
    }


    let fajax = new FAJAX()
    fajax.open("POST", "check-user", { userName: name, userPassword: password });
    let result = fajax.send()

    if (result.message == 200) {
        currentUser=result.thisUser;
        goToList();
        print();
    }
    else {
        alert("you dont exist")
    }
}



//log-out
function logOut() {
    currentUser = null;
    document.getElementById("displayTasks").innerHTML = "";
    goToSignIN()
    let Return = { message: 200 };
    return Return;
}




//print all tasks
function print() {
    let fajax = new FAJAX()
    fajax.open("GET", "get-user");
    let result = fajax.send();
    let currentUser = result.body;
    document.getElementById("displayTasks").innerHTML = "";
    for (const element of currentUser[indexUser].tasks) {
        printTask(element)
    }
}

//print task
function printTask(element) {
    let divTask = document.createElement("div");
    divTask.className = "task";
    divTask.id = element.ID;
    let h1 = document.createElement("h1");
    let p = document.createElement("p");
    let addButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    let displayTasks = document.getElementById("displayTasks");
    p.innerHTML = element.TaskBody;
    h1.innerHTML = element.TaskHeader;
    addButton.innerHTML = "change";
    deleteButton.innerHTML = "delete";
    addButton.className="task-button";
    deleteButton.className="task-button";
    displayTasks.appendChild(divTask);
    divTask.appendChild(h1);
    divTask.appendChild(p);
    divTask.appendChild(addButton);
    divTask.appendChild(deleteButton);
    deleteButton.onclick = function () { DeleteTask(divTask.id) };
    addButton.onclick = function () { changeTask(divTask.id, p, h1) };
}


//add task
function addTask() {
    let addbutton = document.getElementById("add-task-button")
    addbutton.style.display = "none"
    let ind = index;

    let task=create(ind)
    
    
    task.Button.onclick = function () {

        let taskHeader = document.getElementById(`task-header ${ind}`).value;
        let taskBody = document.getElementById(`task-body ${ind}`).value;
        let fajax = new FAJAX();
        fajax.open("POST", "add-task", { TaskHeader: taskHeader, TaskBody: taskBody, ID: ind });
        let result = fajax.send();
        index++;

        if (result.message == 200) {
            let ind = fajax.body.ID;
            addbutton.style.display = "block"
            

            printTask({ TaskHeader: taskHeader, TaskBody: taskBody, ID: ind })
            task.Header.style.display="none"
            task.Body.style.display="none"
            task.Button.style.display = "none"
        }
    }
    
}

//change task

function changeTask(ind, p, h1) {

    let task=create(`-change ${indexChange}`)

    task.Button.onclick = function () {
        let fajax = new FAJAX();
        fajax.open("PUT", "put-task", { TaskHeader: task.Header.value, TaskBody: task.Body.value, ID: ind });
        let result = fajax.send();
        indexChange++;

        if (result.message == 200) {

            p.innerHTML = task.Body.value;
            h1.innerHTML = task.Header.value;

            task.Header.style.display="none"
            task.Body.style.display="none"
            task.Button.style.display = "none"

        }

    }

}

//create display
function create(id) {
    let inputHeader = document.createElement("input");
    let bodyHeader = document.getElementById("list");
    bodyHeader.appendChild(inputHeader);
    inputHeader.id = `task-header ${id}`;
    inputHeader.placeholder = "header"
    inputHeader.className= "input"
    inputHeader.style.display = "block"

    let inputBody = document.createElement("textarea");
    let bodyBody = document.getElementById("list");
    bodyBody.appendChild(inputBody);
    inputBody.id = `task-body ${id}`;
    inputBody.placeholder = "body";
    inputBody.className= "input"
    inputBody.style.display = "block";

    let sendButton = document.createElement("button");
    let bodyButton = document.getElementById("list");
    bodyButton.appendChild(sendButton);
    sendButton.id = `task-button ${id}`;
    sendButton.placeholder = "send";
    sendButton.style.display = "block";
    sendButton.innerHTML = "ok";

    return {Button:sendButton,Header:inputHeader,Body:inputBody}
}

//delete task
function DeleteTask(ind) {

    let fajax = new FAJAX()
    fajax.open("DELETE", "delete-task", { ID: ind });
    let result = fajax.send()
    if (result.message == 200) {
        let div = document.getElementById(ind);
        div.style.display = "none"
    }
}

//go to another page
function goToList() {
    document.querySelector('.active').classList.remove('active');
    document.getElementById('list').classList.add('active');
    history.pushState({}, 'list', "#list");
}

function goToSignIN() {
    document.querySelector('.active').classList.remove('active');
    document.getElementById('list').classList.add('active');
    history.pushState({}, 'sign-in', `#sign-in`);
}
