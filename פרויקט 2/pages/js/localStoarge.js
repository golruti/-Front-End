let user, users, sname, spassword, semail, scores, lname, lpassword, currentUser;

let signUpButton = document.getElementById("signBotton");
signUpButton.addEventListener("click", signUp);

function signUp() {
    users = JSON.parse(localStorage.getItem('users'));
    sname = document.getElementById("sname").value;
    semail = document.getElementById("semail").value;
    spassword = document.getElementById("spassword").value;
    if (!sname || !semail || !spassword)
    {
        return;
    }
    let user = {
        name: sname,
        email: semail,
        password: spassword,
        scores: 0
    }
    if (!users) {
        users = [];
    }
    else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == user.email) {
                alert("you have to log in");
                return;
            }
        }
    }
    users.push(user);
    localStorage.setItem('users',JSON.stringify( users));
    index = users.length - 1;
    localStorage.setItem('index', JSON.stringify(index));
    window.open("../html/homePage.html", "games");
}

let loginButton = document.getElementById("logBotton");
loginButton.addEventListener("click", login);
function login() {
    users = JSON.parse(localStorage.getItem('users'));
    lname = document.getElementById("lname").value;
    lpassword = document.getElementById("lpassword").value;
    if(!lname || !lpassword)
    {
        return;
    }
    if (!users) {
        alert("you have to sign up");
        return;
    }
    for (let i = 0; i < users.length; i++) {
        if (users[i].name == lname && users[i].password == lpassword) {
            index = i;
            localStorage.setItem('index', JSON.stringify(index));
            alert("we are happy to meet you again");
            window.open("../html/index.html", "games");
            return;
        }
    }
    alert("you have to sign up");
}

