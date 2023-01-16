import { useDispatch } from "react-redux"
import { addArrProductToCart } from "store/cart";
import { setLogOut } from "store/loggedIn";
import { removeUser } from "store/loggedUser";
import { addArrProductToWishlist } from "store/wishlist";

const useLogoutUser = () => {
const dispatch=useDispatch()
return ()=>{
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