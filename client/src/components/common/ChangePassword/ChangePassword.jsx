import updateInputs from 'functions/updateInputs'
import './changePassword.scss'
import {useState } from 'react'
import axios from 'axios'
import Input from '../Input/Input'
import Button from '../Button/Button'
import ExpandSection from '../ExpandSection/ExpandSection'
import Box from '../Box/Box'


const ChangePassword = () => {
  const [inputs,setInputs]=useState({
    password:"",
    newPassword:"",
    confirmNewPassword:""
  })



  const handleInputs = ev => updateInputs(ev, setInputs);

  const handleChangePassword=async()=>{
      try {
          let {data}=await axios.patch(`/v1/users/auth/updatepassword`,inputs)
          console.log(data);
          setInputs({
            password:"",
            newPassword:"",
            confirmNewPassword:""
          })
          localStorage.setItem('token',data.data.token)
      } catch (error) {
          console.log(error);
      }
  }
  return (
    <Box classes="bg-secondary-ofwood">
        <ExpandSection title="Change password">
      <div>
          <label htmlFor="password">Password</label>
          <Input value={inputs.password} onchange={handleInputs} datalabel="password" id="password" type="password" />
      </div>
      <div>
          <label htmlFor="newPassword">New password</label>
          <Input value={inputs.newPassword} onchange={handleInputs} datalabel="newPassword" id="newPassword" type="password" />
      </div>
      <div>
          <label htmlFor="confirmNewPassword">Confirm new password</label>
          <Input value={inputs.confirmNewPassword} onchange={handleInputs} datalabel="confirmNewPassword" id="confirmNewPassword" type="password" />
      </div>
      <Button onclick={handleChangePassword} classes="primary-button">Update my information</Button>
        </ExpandSection>
    </Box>
  )
}

export default ChangePassword