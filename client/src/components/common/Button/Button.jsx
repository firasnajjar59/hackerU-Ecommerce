import "./button.scss"

const Button = (props) => {

  return (
    <button onClick={props.onclick} className={`${props.classes}`} >{props.children}</button>
  )
}

export default Button