import "./logoImg.scss"
const LogoImg = (props) => {
  return (
    <div className="logoWrapper">
    <img className="" src={props.src} alt="" />
  </div>
  )
}

export default LogoImg