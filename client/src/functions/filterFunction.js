

 const filterFunction = (input,setfunc,arr,searchIn,load) => {
    let copyCards=JSON.parse(JSON.stringify(arr))
    let regex=new RegExp(input,"i")
    copyCards=copyCards.filter(item=>regex.test(item[searchIn]))
    if(load){
        return copyCards
    }
    setfunc(copyCards)
}
export default filterFunction