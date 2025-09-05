export const catchAsyncError = (err)=>{
    return (req,res,next)=>{
        Promise.resolve(err(req,res,next)).catch(next);
    };
};