// * this function get a async function.
// * async function return promise
// * then we can chain catch to catch error
// * and now we don't need to repeat a try and catch blocks 
module.exports= catchAsync = fn => {
    return (req,res,next)=>{
        fn(req,res,next).catch(next)
    }
}