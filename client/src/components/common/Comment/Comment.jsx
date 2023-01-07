import './comment.scss'


const Comment = ({review}) => {
  return (
    <div className='comment'>
          <div className='comment-img'>
            <img
              src={review.user_id.userImg}
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