function Server(method, url, body = null) {
    try {


        switch (method) {

            case 'POST': {
                //sign up
                if (url === 'add-user') {
                    let user=getUser(body)
                   
                    if (user !== null) {
                        let Return = { message: 500 };
                        return Return;
                    }
                    addUser(body);
                    let Return = { message: 200 ,thisUser :user }
                    return Return;
                }

                //sign in
                if (url === 'check-user') {
                    let user=getUser(body)
                    if (user !== null) {
                        let Return = { message: 200,thisUser : user };
                        return Return;
                    }
                    let Return = { message: 500 }
                    return Return;
                }

                //add task
                if (url === 'add-task') {
                    postTask(body);
                    let Return = { message: 200 };
                    return Return;
                }
            }

            case 'DELETE': {
                //delete task
                if (url === 'delete-task') {
                    deleteTask(body);
                    let Return = { message: 200 };
                    return Return;
                }
                //delete user
                if (url === 'delete-user') {
                    deleteUser();
                    let Return = { message: 200 };
                    return Return;
                }
            }


            case 'GET': {
                //get users
                let Return = { message: 200, body: getUsers() };
                return Return;
            }

            case 'PUT': {
                //put task
                if (url === 'put-task') {
                    putTask(body);
                    let Return = { message: 200, body: getTask(body) };
                    return Return;
                }

            }
            default:
                break;
        }

    } catch (error) {
        return { error: 400 };
    }

}