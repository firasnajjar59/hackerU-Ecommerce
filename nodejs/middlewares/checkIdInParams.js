/** @format */

checkIdInParams = (req, res, next,val) => {
 
    console.log(req.params.id);
    if(!req.params.id){
       return res.status(400).json({msg:"provide a id in url"})
    }
    next();
  };
  module.exports = checkIdInParams;
  