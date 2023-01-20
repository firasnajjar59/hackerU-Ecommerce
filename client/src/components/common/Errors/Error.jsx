import './error.scss'

const Error = (props) => {
  return (
    <p className='error '>{props.children}</p>
  )
}

export default Error