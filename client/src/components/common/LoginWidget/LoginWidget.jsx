import { useDispatch, useSelector } from "react-redux"
import MaterialIcon from "../MaterialIcon/MaterialIcon"
import "./loginWidget.scss"
import LoginPopUp from "components/specific/LoginPop/LoginPopUp"
import { setHidden, setShow } from "store/popupHandler"

const LoginWidget = (props) => {
  const loginHidden=useSelector(state=>state.popupHandler.loginHidden)
  const dispatch=useDispatch()
  const openPopup=()=>{
    if(props.closeParentPopup)props.closeParentPopup()
    dispatch(setShow('loginHidden'))
  }
  return (
    <>
      <LoginPopUp onclick={()=>{dispatch(setHidden("loginHidden"))}} classes={loginHidden?"hidden":""}></LoginPopUp>
    <div className={`memberSection ${props.classes}`}>
        <MaterialIcon title='shopping_cart' />
        <MaterialIcon
          onclick={openPopup}
          title='login'
        />
        <MaterialIcon title='account_circle' />
        <MaterialIcon title='favorite' />
      </div>
    </>
  )
}

export default LoginWidget