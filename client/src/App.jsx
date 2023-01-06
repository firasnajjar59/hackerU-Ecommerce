/** @format */

import './App.scss';
import Body from 'layout/body/Body';
import Header from 'layout/header/Header';
import Store from 'pages/Store/Store';
import { Route, Switch } from 'react-router-dom';
import HomePage from 'pages/Home/HomePage';
import ProductPage from 'pages/ProductPage/ProductPage';
import NavBar from 'components/specific/NavBar/NavBar';
import AboutUs from 'pages/AboutUs/AboutUs';
import { useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { setScreenSize } from 'store/screenSize';
import GalleryPage from 'pages/Gallery/GalleryPage';
import ContactUsPage from 'pages/ContactUs/ContactUsPage';
import Cart from 'pages/Cart/Cart';

const App=()=> {
  const dispatch=useDispatch()
  useEffect(()=>{
    window.addEventListener("resize",()=>{
      dispatch(setScreenSize())
    }
    )
  },[])
  return (
    <div className='container-fluid App'>
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
          <Route
            path='/gallery'
            component={GalleryPage}
          />
          <Route
            path='/contactus'
            component={ContactUsPage}
          />
          <Route
            path='/cart'
            component={Cart}
          />
        </Switch>
      
      </Body>
    </div>
  
  );
}

export default App;
