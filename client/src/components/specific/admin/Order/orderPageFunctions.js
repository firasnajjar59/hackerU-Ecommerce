import sortFunction from "functions/sortByDate"



const handleSearchBtn=(inputs,arr,setFunc)=>()=>{
    let copyCards=JSON.parse(JSON.stringify(arr))
    let regex=new RegExp(inputs,"i")
    copyCards=copyCards.filter(item=>regex.test(item.user_id.email))
    sortFunction(copyCards,setFunc)
  }
export {handleSearchBtn};