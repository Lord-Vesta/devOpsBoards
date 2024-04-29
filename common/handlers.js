export class messageHandler {
    
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}


export class responseHandler{
    constructor(statusCode,data,message){
        this.statusCode = statusCode;
        this.data = data
        this.message = message;
    }
}

export class routeHandler{
    constructor(path,router){
        this.path = path;
        this.router = router;
    }
}


