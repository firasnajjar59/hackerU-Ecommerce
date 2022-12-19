exports.admin = (req,res,next)=>{
    if(req.headers.token=="admin"){
        next()
    }else{
        res.status(401).json({data:"need valid token"})
    }
}
exports.user = (req,res,next)=>{
    if(req.headers.token=="user"){
        next()
    }else{
        res.status(401).json({data:"need valid token"})
    }
}
exports.adminOrUser = (req,res,next)=>{
    if(req.headers.token=="user"||req.headers.token=="admin"){
        next()
    }else{
        res.status(401).json({data:"need valid token"})
    }
}