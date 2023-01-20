const sortFunction = (arr,setFunc) => {
    let copyCards = JSON.parse(JSON.stringify(arr));
    copyCards = copyCards.sort((a, b)=>{
        let x = new Date(a.createdAt);
        let y = new Date(b.createdAt);
        if (x < y) {
            return 1;
          }
    if (x > y) {
      return -1;
    }
    return 0;
  });
  setFunc(copyCards);
};
export default sortFunction