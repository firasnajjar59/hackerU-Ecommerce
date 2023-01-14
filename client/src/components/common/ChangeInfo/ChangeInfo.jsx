import './changeInfo.scss'

import { ChangeUserImg } from '../ChangeUserImg/ChangeUserImg'
import DeactivateAccount from '../DeactivateAccount/DeactivateAccount'
import UserDetailsChange from '../UserDetailsChange/UserDetailsChange'
import ChangePassword from '../ChangePassword/ChangePassword'



const ChangeInfo = () => {
  return (
  <div className='change-info'>
    <h2>Update User</h2>
    <UserDetailsChange/>
    <ChangePassword/>
    <ChangeUserImg/>
    <DeactivateAccount />
  </div>
  )
}

export default ChangeInfo