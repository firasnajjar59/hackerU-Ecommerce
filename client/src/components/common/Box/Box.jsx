import './box.scss'

const Box = (props) => {
  return (
    <div onClick={props.onclick} className={`box ${props.classes}`}>
        {props.children}
</div>
  )
}

export default Box