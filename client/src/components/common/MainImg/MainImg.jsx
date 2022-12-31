import "./mainImg.scss"

const MainImg = (props) => {
  return (
    <div className="main-img">
    <img
      src={props.src}
      alt="props.alt"
    />
  </div>
  )
}

export default MainImg