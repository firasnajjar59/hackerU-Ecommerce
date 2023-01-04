import './comment.scss'


const Comment = (props) => {
  return (
    <div className='comment'>
          <div className='comment-img'>
            <img
              src='../../../../zahi_v1_2022-Mar-10_10-44-17AM-000_CustomizedView3183948036.png'
              alt=''
            />
          </div>
          <div className='comment-content'>
            <p className='commet-user-name'>Firas Najjar</p>
            <p className='commet-user-content'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
              totam?
            </p>
          </div>
        </div>
  )
}

export default Comment