import "./roundedImg.scss"
const RoundedImg = (props) => {
  return (
    <div className={`OurCustemersCard ${props.classes}`}>
            <img src={props.src} alt={props.alt}/>
    </div>
  )
}

export default RoundedImg