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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setScreenSize } from 'store/screenSize';
import GalleryPage from 'pages/Gallery/GalleryPage';
import ContactUsPage from 'pages/ContactUs/ContactUsPage';
import Cart from 'pages/Cart/Cart';
import { setLogIn } from 'store/loggedIn';
import jwtDecode from 'jwt-decode';
import { setUser } from 'store/loggedUser';
import LoginPopUp from 'components/specific/LoginPop/LoginPopUp';
import RegisterPopup from 'components/specific/RegisterPopup/RegisterPopup';
import HumburgerMenu from 'components/specific/HumburgerMenu/HumburgerMenu';
import ProductImgPopup from 'components/specific/ProductImgPopup/ProductImgPopup';
import Profile from 'pages/Profile/Profile';
import LoadingAnimate from 'components/specific/LoadingAnimate/LoadingAnimate';
import { doneLoading } from 'store/loading';
import LoginGard from 'guards/LoginGard';
import  { addArrProductToCart } from 'store/cart';
import Wishlist from 'pages/Wishlist/Wishlist';
import { addArrProductToWishlist } from 'store/wishlist';

const App = () => {
  const cart=useSelector(state=>state.cart.cart)
  const wishlist=useSelector(state=>state.wishlist.wishlist)
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(true);
  const loading = useSelector(state => state.loading.loading);
useEffect(()=>{
  setTimeout(() => {
    setAnimate(false);
  }, 2500);//3000
},[])


  process.env.REACT_APP_URL = window.location.origin.toString();
  useEffect(() => {
    window.addEventListener('resize', () => {
      dispatch(setScreenSize());
    });
  }, []);
  // cart and wishlist
  useEffect(() => {
    if (localStorage.getItem('cart')) {
    dispatch(addArrProductToCart(JSON.parse(localStorage.getItem('cart'))))
    }
    if (localStorage.getItem('wishlist')) {
    dispatch(addArrProductToWishlist(JSON.parse(localStorage.getItem('wishlist'))))
    }
  }, []);

  useEffect(() => {
    
  }, [cart,wishlist]);
  useEffect(() => {
    (async () => {
      if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token');
        try {
          let user = await jwtDecode(token);
          dispatch(setUser(user));
          dispatch(setLogIn());
      
        } catch (error) {
          localStorage.removeItem('token');
          console.log(error);
       
        }
      }
        dispatch(doneLoading())
    })();
  }, []);
  return (
    <div className='container-fluid App'>
      <LoadingAnimate
        imgClasses={animate||loading ? `img-fade-in` : `img-fade-out`}
        classes={animate||loading ? `fade-in` : `fade-out`}
      />
      <Header classes='container m-auto'>
        <NavBar />
      </Header>

      <Body>
        {!loading&&!animate&&<Switch>
          <Route
            path='/'
            exact
            component={HomePage}
          />
          <Route
            path={`/menu`}
            component={HumburgerMenu}
          />
          <Route
            path='/store'
            component={Store}
          />
          <Route
            path='/products/:slug'
            component={ProductPage}
          />
          <Route
            path={`/imgs/:productId`}
            component={ProductImgPopup}
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
          <Route
            path='/wishlist'
            component={Wishlist}
          />
          <Route
            path={`/register`}
            component={RegisterPopup}
          />
          <Route
            path={`/signin`}
            component={LoginPopUp}
          />
          <LoginGard path={`/profile`}
            component={Profile} />
          {/* <Route
            path={`/profile`}
            component={Profile}
          /> */}
        </Switch>}
      </Body>
    </div>
  );
};

export default App;
