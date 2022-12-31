
export const Li = (props) => {
  return (
    <li className={`Li ps-3 ${props.classes}`} onClick={props.onclick}>{props.title}</li>
  )
}
export default Li;