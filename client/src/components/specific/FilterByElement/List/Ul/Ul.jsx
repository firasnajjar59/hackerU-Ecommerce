import "./Ul.scss"

const Ul = (props) => {
  
  return (
        <ul className={`Ul ${props.classes}`}>
          {props.children}
        </ul> 
  )
}

export default Ul