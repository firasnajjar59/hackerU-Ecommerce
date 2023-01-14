import { useSelector } from 'react-redux'
import './comment.scss'


const Comment = ({review}) => {
  const user=useSelector(state=>state.loggedUser.user)
  return (
    <div className='comment'>
          <div className='comment-img'>
            <img
              src={review.user_id.userImg.startsWith("http")?review.user_id.userImg:`${process.env.REACT_APP_SERVER_URL}/images/users/${review.user_id.userImg}`}
              alt=''
            />
          </div>
          <div className='comment-content'>
            <p className='commet-user-name'>{review.user_id.userName}</p>
            <p className='commet-user-content'>
              {review.reviewValue}
            </p>
          </div>
        </div>
  )
}

export default Comment