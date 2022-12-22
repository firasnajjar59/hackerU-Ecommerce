/** @format */

requestedAt = () => (req, res, next)=>{
  req.requestedAt = new Date().toISOString();
  console.log('hi');
  next();
};
module.exports = requestedAt;