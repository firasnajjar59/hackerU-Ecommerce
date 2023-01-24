import { useDispatch } from "react-redux"
import { useHistory, useLocation } from "react-router-dom";
import { addArrProductToCart } from "store/cart";
import { setLogOut } from "store/loggedIn";
import { removeUser } from "store/loggedUser";
import { addArrProductToWishlist } from "store/wishlist";

const useLogoutUser = () => {
    const dispatch=useDispatch()
    const history=useHistory()
    const location=useLocation()
    return ()=>{
    history.push("/")
    localStorage.removeItem('token');
    dispatch(setLogOut());
    dispatch(removeUser());
    let wishlist=[]
    if(localStorage.getItem('wishlist')){
        wishlist=JSON.parse(localStorage.getItem('wishlist'))
    }
    let cart=[]
    if(localStorage.getItem('cart')){
        cart=JSON.parse(localStorage.getItem('cart'))
    }
    dispatch(addArrProductToWishlist(wishlist));
    dispatch(addArrProductToCart(cart));
}
}

export default useLogoutUser