import "./input.scss"
const Input = (props) => {
  return (
  <input
  className={`input ${props.classes}`}
  type={props.type}
  placeholder={props.placeholder}
  id={props.id}
  value={props.value}
  onChange={props.onchange}
  data-label={props.datalabel}
  name={props.name}
  multiple={props.multi&&props.multi}
/>
  )
}

export default Input