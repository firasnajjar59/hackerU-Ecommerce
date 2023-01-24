import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux"
import { addArrProductToCart } from "store/cart";
import { setLogIn } from "store/loggedIn";
import { setUser } from "store/loggedUser";
import { addArrProductToWishlist } from "store/wishlist";

const useUpdateUserRedux = () => {
const dispatch=useDispatch()
return (token)=>{
    localStorage.setItem('token', token);
    let user = jwtDecode(token);
    dispatch(setLogIn());
    dispatch(setUser(user));
    dispatch(addArrProductToWishlist(user.wishlist));
    dispatch(addArrProductToCart(user.cart));
}
}

export default useUpdateUserRedux