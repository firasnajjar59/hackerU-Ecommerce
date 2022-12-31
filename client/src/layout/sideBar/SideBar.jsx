import "./sideBar.scss"
const SideBar = (props) => {
  return (
    <div className="sideBar">{props.children}</div>
  )
}

export default SideBar