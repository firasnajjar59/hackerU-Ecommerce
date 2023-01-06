import "./materialIcon.scss"
const MaterialIcon = (props) => {
  return (
    <span onClick={props.onclick} className={`icon ${props.classes?props.classes:""} material-symbols-rounded`}> {props.title} </span>
  )
}

export default MaterialIcon