import "./logoImg.scss"
const LogoImg = (props) => {
  return (
    <div className="logoWrapper">
    <img className="" src={`${process.env.REACT_APP_SERVER_URL}/images/logo/${props.src}`} alt="" />
  </div>
  )
}

export default LogoImg