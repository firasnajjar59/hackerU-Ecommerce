import axios from 'axios'
import Button from '../Button/Button'
import './deactivateAccount.scss'
import { useDispatch } from 'react-redux'
import { setLogOut } from 'store/loggedIn'
import { removeUser } from 'store/loggedUser'
import { useHistory } from 'react-router-dom'
import ExpandSection from '../ExpandSection/ExpandSection'
import Box from '../Box/Box'


const DeactivateAccount = () => {
 const dispatch=useDispatch()
 const history=useHistory()

    const handleDeactivateAccount=async()=>{
        try {
            let {data}=await axios.delete("/v1/users/deleteme")
            console.log(data);
            localStorage.removeItem("token")
            dispatch(setLogOut())
            dispatch(removeUser())
            history.push("/")
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Box classes="bg-secondary-ofwood">
      <ExpandSection title="Deactivate your account">
        <Button onclick={handleDeactivateAccount} classes="danger-button mt-5">Deactivate</Button>

      </ExpandSection>
    </Box>
  )
}

export default DeactivateAccount