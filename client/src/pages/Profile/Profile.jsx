import './profile.scss'
import Ul from 'components/specific/FilterByElement/List/Ul/Ul'
import Li from 'components/specific/FilterByElement/List/Li/Li'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import NavBarLink from 'components/common/NavLink/NavLink'
import ChangeInfo from 'components/common/ChangeInfo/ChangeInfo'
import ChangePassword from 'components/common/ChangePassword/ChangePassword'
import Cart from 'pages/Cart/Cart'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon'
import CreateProduct from 'components/specific/admin/CreateProduct/CreateProduct'
import AdminGard from 'guards/AdminGard'
import BoxContainer from 'components/common/BoxContainer/BoxContainer'
import Wishlist from 'pages/Wishlist/Wishlist'
import AdminProductsPage from 'pages/AdminProductsPage/AdminProductsPage'
import AdminUser from 'pages/AminUser/AdminUser'
import ContributorGard from 'guards/ContributorGard'
import MyOrders from 'pages/MyOrders/MyOrders'
import Order from 'components/specific/admin/Order/Order'
import OneOrder from 'components/specific/admin/OneOrder/OneOrder'
import WebContent from 'pages/WebContent/WebContent'
import NewsLetter from 'pages/NewsLetter/NewsLetter'
import EditProduct from 'components/specific/admin/EditProduct/EditProduct'


const Profile = () => {
    document.title = `Profile | ofwood`;
    const user=useSelector(state=>state.loggedUser.user)
    const {path,url}=useRouteMatch()
    const screenWidth=useSelector(state=>state.screenSize.screenWidth)
    const [displayMenu,setDisplayMenu]=useState(false)
    const handleInnerMenuSmallScreen=()=>{
        setDisplayMenu(displayMenu?false:true)
    }
 
  return (
    <div className='container m-auto mt-3'>
        <BoxContainer>
            <div className="profile-grid">
                <div className="profile-left bg-primary-opacity">
                    <div className='profile-left-top'>
                    <div className="profile-img-wrapper ">
                        {user&&<img src={`${process.env.REACT_APP_SERVER_URL}/images/users/${user.userImg}`} alt="" />}
                    </div>
                    <MaterialIcon onclick={handleInnerMenuSmallScreen} title={displayMenu?"expand_less":"expand_more"}/>
                    </div>
                    {screenWidth>600||screenWidth<=600&&displayMenu?<div className="left-menu">
                        <Ul classes="menu-list bg-primary-opacity">
                            <Li classes="menu-list-item"><NavBarLink classes="nav" onclick={()=>{setDisplayMenu(false)}} path={`${url}`} label="Profile"/></Li>
                            {user.role=="admin"?
                                <>
                                <Li classes="menu-list-item"><NavBarLink classes="nav" onclick={()=>{setDisplayMenu(false)}} path={`${url}/users`} label="Users"/></Li>
                                <Li classes="menu-list-item"><NavBarLink classes="nav" onclick={()=>{setDisplayMenu(false)}} path={`${url}/products`} label="Products"/></Li>
                                <Li classes="menu-list-item"><NavBarLink classes="nav" onclick={()=>{setDisplayMenu(false)}} path={`${url}/createproducts`} label="Add Products"/></Li>
                                <Li classes="menu-list-item"><NavBarLink classes="nav" onclick={()=>{setDisplayMenu(false)}} path={`${url}/orders`} label="Orders"/></Li>
                                <Li classes="menu-list-item"><NavBarLink classes="nav" onclick={()=>{setDisplayMenu(false)}} path={`${url}/webcontent`} label="Web content"/></Li>
                                <Li classes="menu-list-item"><NavBarLink classes="nav" onclick={()=>{setDisplayMenu(false)}} path={`${url}/newsletter`} label="Newsletter"/></Li>
                            </>:""
                            }
                            {user.role=="contributor"?
                                <>
                                <Li classes="menu-list-item"><NavBarLink classes="nav" onclick={()=>{setDisplayMenu(false)}} path={`${url}/products`} label="Products"/></Li>
                                <Li classes="menu-list-item"><NavBarLink classes="nav" onclick={()=>{setDisplayMenu(false)}} path={`${url}/orders`} label="Orders"/></Li>
                                <Li classes="menu-list-item"><NavBarLink classes="nav" onclick={()=>{setDisplayMenu(false)}} path={`${url}/webcontent`} label="Web content"/></Li>
                            </>:""
                            }
                            <Li classes="menu-list-item"><NavBarLink classes="nav" onclick={()=>{setDisplayMenu(false)}} path={`${url}/myorders`} label="My orders"/></Li>
                            <Li classes="menu-list-item"><NavBarLink classes="nav" onclick={()=>{setDisplayMenu(false)}} path={`${url}/wishlist`} label="Wishlist"/></Li>
                            <Li classes="menu-list-item"><NavBarLink classes="nav" onclick={()=>{setDisplayMenu(false)}} path={`${url}/cart`} label="Cart"/></Li>
                        </Ul>
                    </div>:null}
                </div>
                <div className="profile-right bg-primary-opacity">
                    <Switch>
                    {/* user */}
                    <Route path={`${path}`} exact component={ChangeInfo} />
                    <Route path={`${path}/myorders`} component={MyOrders} />
                    <Route path={`${path}/cart`}><Cart polices="false"/></Route>
                    <Route path={`${path}/wishlist`}><Wishlist/></Route>
                    {/* contributor */}
                    <ContributorGard path={`${path}/products`} exact component={AdminProductsPage} />
                    <ContributorGard path={`${path}/products/:slug`} component={EditProduct} />
                    <ContributorGard path={`${path}/orders`} exact component={Order} />
                    <ContributorGard path={`${path}/orders/:order_id`} component={OneOrder} />
                    <ContributorGard path={`${path}/webcontent`} component={WebContent} />
                    {/* admin */}
                    <AdminGard path={`${path}/users`} component={AdminUser} />
                    <AdminGard path={`${path}/createproducts`} component={CreateProduct} />
                    <AdminGard path={`${path}/newsletter`} component={NewsLetter} />
                    </Switch>
                </div>
            </div>
        </BoxContainer>
    </div>
  )
}

export default Profile