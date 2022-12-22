// filter object
const filterObj=(obj,...allowedFields)=>{
    let newObj={};
    Object.keys(obj).forEach(el=>{
      if(allowedFields.includes(el)){
        newObj[el]=obj[el]
    }
  })
  return newObj
  }
  module.exports=filterObj