/** @format */

import './App.scss';
import Body from 'layout/body/Body';
import Header from 'layout/header/Header';
import Store from 'pages/store/Store';
import { Route, Switch } from 'react-router-dom';
import HomePage from 'pages/Home/HomePage';
import ProductPage from 'pages/ProductPage/ProductPage';
import NavBar from './components/specific/NavBar/NavBar';
import AboutUs from 'pages/AboutUs/AboutUs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setScreenSize } from 'store/screenSize';
import GalleryPage from 'pages/Gallery/GalleryPage';
import ContactUsPage from 'pages/ContactUs/ContactUsPage';
import Cart from 'pages/Cart/Cart';
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
import useUpdateUserRedux from 'hooks/useUpdateUserRedux';
import PlaceOrder from 'pages/PlaceOrder/PlaceOrder';
import axios from 'axios';
import { setLogoImg } from 'store/logo';
import ResetPasswordPopUp from 'components/specific/ResetPasswordPopUp/ResetPasswordPopUp';
import Toast from 'components/common/Toast/Toast';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryComponent from 'components/common/Errors/ErrorBoundaryComponent';
import myErrorHandler from 'components/common/Errors/MyErrorHandler';
import useOfwoodErrorhandler from 'components/common/Errors/errorhandler';
import PageNotFound from 'pages/PageNotFound/PageNotFound';
import Doc from 'pages/Doc/Doc';
const App = () => {
  const ofwoodErrorhandler=useOfwoodErrorhandler()
  const updateUser=useUpdateUserRedux()
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(true);
  const loading = useSelector(state => state.loading.loading);
  const loggedIn = useSelector(state => state.loggedIn.loggedIn);
useEffect(()=>{
  setTimeout(() => {
    setAnimate(false);
  },300);//3000
},[])


  process.env.REACT_APP_URL = window.location.origin.toString();
  useEffect(() => {
    window.addEventListener('resize', () => {
      dispatch(setScreenSize());
    });
  }, []);
  // cart and wishlist
  useEffect(() => {
    if (!loading&&!loggedIn&&localStorage.getItem('cart')) {
    dispatch(addArrProductToCart(JSON.parse(localStorage.getItem('cart'))))
    }
    if (!loading&&!loggedIn&&localStorage.getItem('wishlist')) {
      dispatch(addArrProductToWishlist(JSON.parse(localStorage.getItem('wishlist'))))
    }
  }, [loading]);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token');
        try {
         updateUser(token)
      
        } catch (error) {
          ofwoodErrorhandler(error)
        }
      }
        dispatch(doneLoading())
    })();
  }, []);
  useEffect(()=>{
    (async()=>{
      try {
        const light=await axios.get('/v1/users/admin/webcontent/lightlogo')
        const dark=await axios.get('/v1/users/admin/webcontent/darklogo')
       dispatch(setLogoImg({
        dark:dark.data.data.doc[0].img,
        light:light.data.data.doc[0].img,
      }))
      } catch (error) {
        ofwoodErrorhandler(error.response.data)
      }
    })()
  },[])
  return (
    <div className='container-fluid App'>
      <ErrorBoundary FallbackComponent={ErrorBoundaryComponent} onError={myErrorHandler}>

      <LoadingAnimate
        imgClasses={animate||loading ? `img-fade-in` : `img-fade-out`}
        classes={animate||loading ? `fade-in` : `fade-out`}
      />
      <Header classes='container m-auto'>
        <NavBar />
      </Header>
    <Toast />
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
            path='/products/:slug/:id'
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
          <Route
            path={`/resetpassword`}
            component={ResetPasswordPopUp}
          />
          <LoginGard path={`/profile`}
            component={Profile} />
          <LoginGard path={`/order/:ordertoken`}
            component={PlaceOrder} />
          <Route
            path={`/doc`}
            component={Doc}
          />
          <Route
            path={`/*`}
            component={PageNotFound}
          />
        </Switch>}
      </Body>
      </ErrorBoundary>
    </div>
  );
};

export default App;
