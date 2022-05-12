

//--------------------------------------------------
//GET
//--------------------------------------------------

//get users
function getUsers() {
    let users = JSON.parse(localStorage.getItem("users"));
    return users;
}

//get one user
function getUser(body) {
    let users = getUsers();
    if (users !== null) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].userName === body.userName) {

                return users[i];
            }
        }
    }
    return null;
}

//get all tasks in place
function getTasks() {
    let users = getUsers();
    let tasks = users[indexUser].tasks;
    let Return = { message: 200, body: tasks };
    return Return;
}

//get one task in place
function getTask(body) {
    let tasks = getTasks()
    let task;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].ID = body.ID) {
            task = tasks[i];
        }
    }
    let Return = { message: 200, body: task };
    return Return;
}



//--------------------------------------------------
//POST
//--------------------------------------------------

//add new user
function addUser(newUser) {
    let users = getUsers() || [];
    users.push(newUser);
    indexUser = (users.length) - 1;
    putUsers(users);
}

//add new task
function postTask(newTask) {
    let users = getUsers();
    let user = users[indexUser];

    user.tasks.push(newTask)

    users[indexUser] = user;
    putUsers(users);
}


//--------------------------------------------------
//PUT
//--------------------------------------------------

// update all users
function putUsers(users) {

    localStorage.setItem("users", JSON.stringify(users));
}

//update task
function putTask(message) {
   
    let users = getUsers();

    for (let i = 0; i < users[indexUser].tasks.length; ++i) {
 
        if (users[indexUser].tasks[i].ID == message.ID) {
            users[indexUser].tasks[i] = message;
 
        }
    }
    localStorage.setItem("users", JSON.stringify(users));
}






//--------------------------------------------------
//DELETE
//--------------------------------------------------

//delete one user
function deleteUser() {
    let users = getUsers();
    delete users[indexUser];
    putUsers(users);
}

//delete one task
function deleteTask(body) {
    let users = getUsers();
    users[indexUser].tasks = users[indexUser].tasks.filter(t => t.ID != body.ID)

    putUsers(users);
}


