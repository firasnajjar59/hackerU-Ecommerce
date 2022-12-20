// * class to build custom Error
// * we extend the Error class and build a new Error class
class AppError extends Error{
    // * in the constructor we get the message and the error code
    constructor(message,statusCode){
        // * in the super we pass the message to the Error class
        super(message),
        // * and know we add more keys for our Error object
        this.statusCode=statusCode
        this.status=`${statusCode}`.startsWith('4')?"fail":"error"
        this.isOperational=true;
        Error.captureStackTrace(this,this.constructor)
    }

}

module.exports=AppError