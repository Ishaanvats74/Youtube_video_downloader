class ErrorHandler extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode = statuscode;
    };
};

export const errorMiddleware = (err,req,res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "imtermal server Error";
    console.log(err);

    if(err.code === 11000){
        const statuscode = 400;
        const message = "Duplicate Field value entered";
        err = new ErrorHandler(message,statuscode);
    };
    if(err.name === "CasTError"){
        const statuscode = 400;
        const message = `Resource not found. Invaild ${err.path}`;
        err = new ErrorHandler(message,statuscode);
    };
    return res.status(err.statuscode).json({
        success:false,
        message:err.message
    });
};

export default ErrorHandler;

