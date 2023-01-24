import updateInputs from 'functions/updateInputs'
import './changePassword.scss'
import {useState } from 'react'
import axios from 'axios'
import Input from '../Input/Input'
import Button from '../Button/Button'
import ExpandSection from '../ExpandSection/ExpandSection'
import Box from '../Box/Box'
import useUpdateUserRedux from 'hooks/useUpdateUserRedux'
import useOfwoodErrorhandler from '../Errors/errorhandler'
import validate from 'validations/validate'
import changePassword from 'validations/changepassword'
import { useEffect } from 'react'
import Error from '../Errors/Error'
import { useDispatch } from 'react-redux'
import { resetMessage, setMessage } from 'store/toast'


const ChangePassword = () => {
  const dispatch=useDispatch()
  const [loaded, setLoaded] = useState(false)
  const [serverError, setServerError] = useState("")
  const [error, setError] = useState({
    password:[],
    newPassword:[],
    confirmNewPassword:[]
  });
  const [inputs,setInputs]=useState({
    password:"",
    newPassword:"",
    confirmNewPassword:""
  })
  useEffect(()=>{
    setLoaded(true)
  },[])
  // 
  useEffect(()=>{
    if(loaded){
      const {error}=validate(inputs,changePassword)
           setServerError("")
          setError(prev=>{
            prev[document.activeElement.dataset.label]=[]
            if(error){
              for (let err of error.details){
                if(err.path[0]==document.activeElement.dataset.label){
                  prev[document.activeElement.dataset.label].push(err.message)
                }
              }
            }
            return{
              ...prev
            }
          })
    }
  },[inputs])
  const ofwoodErrorhandler=useOfwoodErrorhandler()
  const updateUser=useUpdateUserRedux()
 



  const handleInputs = ev => updateInputs(ev, setInputs);

  const handleChangePassword=async()=>{
      try {
          const error=validate(inputs,changePassword)
          console.log(error);
          // eslint-disable-next-line no-throw-literal
          if(error.error) throw {name:"ValidationError",error}
          let {data}=await axios.patch(`/v1/users/auth/updatepassword`,inputs)
          setInputs({
            password:"",
            newPassword:"",
            confirmNewPassword:""
          })
          updateUser(data.data.token)
          dispatch(setMessage("The user password updated"))
            setTimeout(()=>{
              dispatch(resetMessage())
            },3000)
      } catch (error) {
        if(error.name=="ValidationError"){
          setServerError("Please check the fields")
        }else{
          ofwoodErrorhandler(error.response.data)
        }
        
      }
  }
  return (
    <Box classes="bg-secondary-ofwood">
        <ExpandSection title="Change password">
        {serverError.length>0&&<Error>{serverError}</Error>}
      <div>
          <label htmlFor="password">Password</label>
          <Input value={inputs.password} onchange={handleInputs} datalabel="password" id="password" type="password" />
          {error.password.length>0&&<Error>{error.password[0]}</Error>}
      </div>
      <div>
          <label htmlFor="newPassword">New password</label>
          <Input value={inputs.newPassword} onchange={handleInputs} datalabel="newPassword" id="newPassword" type="password" />
          {error.newPassword.length>0&&<Error>{error.newPassword[0]}</Error>}
      </div>
      <div>
          <label htmlFor="confirmNewPassword">Confirm new password</label>
          <Input value={inputs.confirmNewPassword} onchange={handleInputs} datalabel="confirmNewPassword" id="confirmNewPassword" type="password" />
          {error.confirmNewPassword.length>0&&<Error>{error.confirmNewPassword[0]}</Error>}
      </div>
      <Button onclick={handleChangePassword} classes="primary-button">Update my information</Button>
        </ExpandSection>
    </Box>
  )
}

export default ChangePassword