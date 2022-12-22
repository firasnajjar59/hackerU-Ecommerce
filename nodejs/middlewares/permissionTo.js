const AppError = require("../utils/appError")

const permissionTo =(...roles)=>(req,res,next)=>{
    if(!roles.includes(req.doc.role))
    {
        return next(new AppError('You are not authorized to perform this action',401))
    }
    next()
}
module.exports=permissionTo