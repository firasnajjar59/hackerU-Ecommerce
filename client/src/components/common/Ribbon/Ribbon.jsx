import "./ribbon.scss"
const Ribbon = (props) => {
  return (
    <div className={`ribbon p-2 ${props.classes}`}>{props.children}</div>
  )
}

export default Ribbon