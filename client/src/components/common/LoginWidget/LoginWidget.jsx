import MaterialIcon from "../MaterialIcon/MaterialIcon"
import "./loginWidget.scss"

const LoginWidget = (props) => {
  return (
    <div className={`memberSection ${props.classes}`}>
        <MaterialIcon title='shopping_cart' />
        <MaterialIcon
          onclick={props.onclickLogin}
          title='login'
        />
        <MaterialIcon title='account_circle' />
        <MaterialIcon title='favorite' />
      </div>
  )
}

export default LoginWidget