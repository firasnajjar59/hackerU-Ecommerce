/** @format */

import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon';
import './searchBar.scss';
import Button from 'components/common/Button/Button';
import Input from 'components/common/Input/Input';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const SearchBar = props => {
  const [search,setSearch]=useState("")
  const [pathname,setPathname]=useState("/store")
  const history=useHistory()
  const location=useLocation()
  const searchBtn=()=>{
      history.push(`/store?name=${search}`)
  }
  useEffect(()=>{
    if(location.pathname!=pathname){
      setSearch('')
    }
  },[location])
  return (
    <div className='searchWrapper d-flex justify-content-center'>
      <Input
        classes={`border-right-none ${props.classes}`}
        placeholder='search'
        type='text'
        value={props.value?props.value:search}
        onchange={props.onchange?props.onchange:(ev)=>{setSearch(ev.target.value)}}
        datalabel='search'
      />
      <Button onclick={props.onclick?props.onclick:searchBtn} classes='search-button'>
        <MaterialIcon
          classes='p-1'
          title='search'
        />
      </Button>
    </div>
  );
};

export default SearchBar;
