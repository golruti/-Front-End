

class FAJAX {
    url;
    method;
    body;
    open = (method, url, body) => {
        this.method = method
        this.url = url
        this.body = body
    }

    send = () => {

        return Server(this.method, this.url, this.body)
    }
}









