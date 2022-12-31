/** @format */

import './App.scss';
import Body from 'layout/body/Body';
import Header from 'layout/header/Header';
import Store from 'pages/store/Store';
import { Route, Switch } from 'react-router-dom';
import HomePage from 'pages/Home/HomePage';
import ProductPage from 'pages/ProductPage/ProductPage';
import NavBar from 'components/specific/NavBar/NavBar';
import AboutUs from 'pages/AboutUs/AboutUs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setScreenSize } from 'store/screenSize';

const App=()=> {
  const screenSize=useSelector(state=>state.screenSize.screenSize)
  const dispatch=useDispatch()
  useEffect(()=>{
    window.addEventListener("resize",()=>{
      dispatch(setScreenSize(window.innerWidth))
      console.log(window.innerWidth);
    })
  },[])
  useEffect(()=>{

      console.log(screenSize);
  
  },[screenSize])
  return (
    <div className='container-fluid App'>
      {/* {screenSize>600?<Header classes='container m-auto'>
         <NavBar />
      </Header>:null} */}
      <Header classes='container m-auto'>
         <NavBar />
      </Header>

      <Body>
        <Switch>
          <Route
            path='/'
            exact
            component={HomePage}
          />
          <Route
            path='/store'
            component={Store}
          />
          <Route
            path='/products/:productId'
            component={ProductPage}
          />
          <Route
            path='/aboutus'
            component={AboutUs}
          />
        </Switch>
      
      </Body>
    </div>
  
  );
}

export default App;
