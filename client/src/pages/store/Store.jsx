/** @format */
import './store.scss'
import Card from 'components/common/Card/Card';
import Ribbon from 'components/common/Ribbon/Ribbon';
import BoxContainer from 'components/common/BoxContainer/BoxContainer';
import FilterByElement from 'components/specific/FilterByElement/filterByElement/FilterByElement';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceholderCard from 'components/common/PlaceholderCard/PlaceholderCard';
import { useHistory, useLocation } from 'react-router-dom';
import { resetMessage, setMessage } from 'store/toast';
import useOfwoodErrorhandler from 'components/common/Errors/errorhandler';

const Store = () => {
  document.title = 'Store | ofwood';
  const ofwoodErrorhandler=useOfwoodErrorhandler()
  const dispatch=useDispatch()
  const history=useHistory()
  const location=useLocation()
  const queryObj=new URLSearchParams(location.search)
  const [paginationArr,setPaginationArr]=useState()
  const [limit,setLimit]=useState(6)
  const [page,setPage]=useState(1)
  const [proudactArr,setProudactArr] = useState([]);
  const screenWidth = useSelector(state => state.screenSize.screenWidth);
  const theme = useSelector(state => state.theme.theme);
  useEffect(()=>{
    (async ()=>{
      try {
        const querystr=location.search.length>0?location.search:`?limit=${limit}&page=${1}`
        let {data:res}=await axios.get(`/v1/products${querystr}`)
          queryObj.has("page")&&setPage(queryObj.get("page"))
          setProudactArr(res.data.doc)
          setPaginationArr(res.docsInDB)
      } catch (error) {
        if(error.response.data.err.statusCode==404){
          dispatch(setMessage("No product found"))
            setTimeout(()=>{
              dispatch(resetMessage())
            },5000)
        }
        if(error.response.data.err.statusCode==500){
         ofwoodErrorhandler(error.resoponse.data)
        }
      }
    })()
  },[location])

  const handleMovePage=(page)=>()=>{
    queryObj.set("page",page)
    setPage(page)
    queryObj.has("limit")?setLimit(queryObj.get("limit")):queryObj.set("limit",limit)
    const querystr=location.search.length>0?`?${queryObj.toString().replaceAll("%2C",",")}`:`?&limit=${limit}&page=${queryObj.get("page")}`
    history.push(`/store${querystr}`)
  }
  const handlePrev=()=>{
    if(queryObj.get("page")!=1&&queryObj.get("page").length>0){
      queryObj.set("page",(1*queryObj.get("page"))-1)
      setPage(queryObj.get("page"))
      const querystr=location.search.length>0?`?${queryObj.toString().replaceAll("%2C",",")}`:`?&limit=${limit}&page=${queryObj.get("page")}`
      history.push(`/store${querystr}`)
    }
  }
  const handleNextPage=()=>{
    let a=Math.ceil(paginationArr/limit)>queryObj.get("page")
    if(Math.ceil(paginationArr/limit)>queryObj.get("page")||!queryObj.has("page")){
      queryObj.has("page")?queryObj.set("page",(1*queryObj.get("page"))+1):queryObj.set("page",2)
      setPage(queryObj.get("page"))
      const querystr=location.search.length>0?`?${queryObj.toString().replaceAll("%2C",",")}`:`?&limit=${limit}&page=${queryObj.get("page")}`
      history.push(`/store${querystr}`)
    }
  }
  const handleSort=(ev)=>{
    if(ev.target.innerText=="Higher Price"){
      queryObj.set("sort","-price")
    }
    if(ev.target.innerText=='Lower Price'){
      queryObj.set("sort","price")
    }
    if(ev.target.innerText=='A-z'){
      queryObj.set("sort","name")
    }
    if(ev.target.innerText=='Z-a'){
      queryObj.set("sort","-name")
    }
    const querystr=queryObj.toString().replaceAll("%2C",",")
    history.push(`/store?${querystr}`)
  }
  return (
    <div className='container m-auto'>
      <div className='row p-2 w-100 mt-3 mb-3'>
        <div className={screenWidth > 600 ? 'col-3' : 'col-sm'}>
          <div className='row'>
            <div className='col mt-3'>
              <BoxContainer
                title='Sort By:'
                color={theme&&window.getComputedStyle(document.documentElement).getPropertyValue('--third-color')}>
                <FilterByElement
                  title='Price'
                  options={['Higher Price','Lower Price']}
                  onclick={handleSort}
                />
                <FilterByElement
                  title='Name'
                  options={['A-z','Z-a']}
                  onclick={handleSort}
                />
              </BoxContainer>
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
