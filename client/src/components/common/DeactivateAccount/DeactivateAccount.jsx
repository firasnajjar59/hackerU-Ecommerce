import axios from 'axios'
import Button from '../Button/Button'
import './deactivateAccount.scss'
import ExpandSection from '../ExpandSection/ExpandSection'
import Box from '../Box/Box'
import useOfwoodErrorhandler from '../Errors/errorhandler'
import useLogoutUser from 'hooks/useLogoutUser'


const DeactivateAccount = () => {
  const ofwoodErrorhandler=useOfwoodErrorhandler()
  const logout=useLogoutUser()


    const handleDeactivateAccount=async()=>{
        try {
            await axios.delete("/v1/users/deleteme")
            logout()
        } catch (error) {
          ofwoodErrorhandler(error.response.data)
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