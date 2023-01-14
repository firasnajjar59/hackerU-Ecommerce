/** @format */
import './store.scss'
import Card from 'components/common/Card/Card';
import Ribbon from 'components/common/Ribbon/Ribbon';
import SideSortComponent from 'components/common/BoxContainer/BoxContainer';
import FilterByElement from 'components/specific/FilterByElement/filterByElement/FilterByElement';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceholderCard from 'components/common/PlaceholderCard/PlaceholderCard';
import { useHistory, useLocation } from 'react-router-dom';

const Store = () => {
  document.title = 'Store | ofwood';
  const history=useHistory()
  const location=useLocation()
  const queryObj=new URLSearchParams(location.search)
  const [paginationArr,setPaginationArr]=useState()
  const [limit,setLimit]=useState(3)
  const [page,setPage]=useState(1)
  const [proudactArr,setProudactArr] = useState([]);
  const screenWidth = useSelector(state => state.screenSize.screenWidth);
  const theme = useSelector(state => state.theme.theme);
  useEffect(()=>{
    (async ()=>{
      try {
        const querystr=location.search.length>0?location.search:`?fields=name,description,imgs,slug&limit=${limit}&page=${1}`
        let {data:res}=await axios.get(`/v1/products${querystr}`)
          queryObj.has("page")&&setPage(queryObj.get("page"))
          setProudactArr(res.data.doc)
          setPaginationArr(res.docsInDB)
      } catch (error) {
        console.log(error);
      }
    })()
  },[location])

  const handleMovePage=(page)=>()=>{
    queryObj.set("page",page)
    setPage(page)
    queryObj.has("limit")?setLimit(queryObj.get("limit")):queryObj.set("limit",limit)
    const querystr=location.search.length>0?`?${queryObj.toString().replaceAll("%2C",",")}`:`?fields=name,description,imgs,slug&limit=${limit}&page=${queryObj.get("page")}`
    history.push(`/store${querystr}`)
  }
  const handlePrev=()=>{
    if(queryObj.get("page")!=1&&queryObj.get("page").length>0){
      queryObj.set("page",(1*queryObj.get("page"))-1)
      setPage(queryObj.get("page"))
      const querystr=location.search.length>0?`?${queryObj.toString().replaceAll("%2C",",")}`:`?fields=name,description,imgs,slug&limit=${limit}&page=${queryObj.get("page")}`
      history.push(`/store${querystr}`)
    }
  }
  const handleNextPage=()=>{
    let a=Math.ceil(paginationArr/limit)>queryObj.get("page")
    if(Math.ceil(paginationArr/limit)>queryObj.get("page")||!queryObj.has("page")){
      queryObj.has("page")?queryObj.set("page",(1*queryObj.get("page"))+1):queryObj.set("page",2)
      setPage(queryObj.get("page"))
      const querystr=location.search.length>0?`?${queryObj.toString().replaceAll("%2C",",")}`:`?fields=name,description,imgs,slug&limit=${limit}&page=${queryObj.get("page")}`
      history.push(`/store${querystr}`)
    }
  }
  return (
    <div className='container m-auto'>
      <div className='row p-2 w-100 mt-3 mb-3'>
        <div className={screenWidth > 600 ? 'col-3' : 'col-sm'}>
          <div className='row'>
            <div className='col '>
              <SideSortComponent
                title='Filter By:'
                color={window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color')}>
                <FilterByElement
                  title='Category'
                  options={['Cabinet', 'Tables']}
                />
                <FilterByElement
                  title='Category'
                  options={['Cabinet', 'Tables']}
                />
              </SideSortComponent>
            </div>
          </div>
          <div className='row'>
            <div className='col mt-3'>
              <SideSortComponent
                title='Sort By:'
                color={theme&&window.getComputedStyle(document.documentElement).getPropertyValue('--third-color')}>
                <FilterByElement
                  title='Sort'
                  options={['Price', 'A-Z']}
                />
              </SideSortComponent>
            </div>
          </div>
        </div>
        <div className={screenWidth > 600 ? 'col-9 px-2' : 'col-sm'}>
          <div className='row'>
            {proudactArr.length>0?proudactArr.map((product, indx) => (
              <div
                key={indx}
                className={screenWidth > 600 ? 'col-sm-4 p-2' : 'col-sm py-3'}>
                <Card _id={product._id} slug={product.slug} title={product.name} img={product.imgs[0]} desc={product.description}>
                  <Ribbon>new</Ribbon>
                </Card>
              </div>
            )):Array(limit).fill(1).map((item,indx)=><div
            key={indx} className={screenWidth > 600 ? 'col-sm-4 p-2' : 'col-sm py-3'}>
            <PlaceholderCard />
          </div>)}
          </div>
          {paginationArr&&<div className="row mt-5">
              <ul className="pagination justify-content-center">
                    <li onClick={handlePrev} className={``}><p className={`pagination-prev-next ${page==1||page.length==0?"disabled-button":""}`}>Previous</p></li>
                    {Array(Math.ceil(paginationArr/limit)).fill(1).map((el,indx)=><li key={indx} onClick={handleMovePage(indx+1)}><p className={`pagination-numbers ${page==indx+1?"pagination-active":""}`} href="#">{indx+1}</p></li>)}
                    <li onClick={handleNextPage} className="page-item"><p className={`pagination-prev-next ${Math.ceil(paginationArr/limit)==page?"disabled-button":""}`}>Next</p></li>
              </ul>
            </div>}
          </div>
        </div>
      </div>
   
  );
};

export default Store;
