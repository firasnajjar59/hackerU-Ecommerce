import PopUp from 'components/common/PopUp/PopUp'
import './resetPasswordPopUp.scss'
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon'
import Error from 'components/common/Errors/Error'
import Input from 'components/common/Input/Input'
import Button from 'components/common/Button/Button'
import updateInputs from 'functions/updateInputs'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useUpdateUserRedux from 'hooks/useUpdateUserRedux'
import { useHistory } from 'react-router-dom'
import validate from 'validations/validate'
import resetPasswordSchema from 'validations/resetPasswordSchema'
import { useDispatch } from 'react-redux'
import useOfwoodErrorhandler from 'components/common/Errors/errorhandler'
import { resetMessage, setMessage } from 'store/toast'

const ResetPasswordPopUp = (props) => {
  const dispatch=useDispatch()
  const ofwoodErrorhandler=useOfwoodErrorhandler()
  const updateUser=useUpdateUserRedux()
  const history=useHistory()
  const [loaded, setLoaded] = useState(false)
    const [serverError, setServerError] = useState("")
    const [inputs, setInputs] = useState({
        token: '',
        password: '',
        passwordConfirm:'',
      });
      const [error, setError] = useState({
        token: [],
        password: [],
        passwordConfirm:[],
      });
        // 
  useEffect(()=>{
    setLoaded(true)
  },[])
      useEffect(()=>{
        if(loaded){
          const {error}=validate(inputs,resetPasswordSchema)
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
      const handleInputs = ev => updateInputs(ev, setInputs);
      const handleResetBtn=async()=>{
        try {
            const {error}=validate(inputs,resetPasswordSchema)
            if(error) throw(error)
            const {data}=await axios.patch("/v1/users/auth/resetpassword",inputs)
            updateUser(data.data.token)
            dispatch(setMessage("Your password updated"))
            setTimeout(()=>{
              dispatch(resetMessage())
            },3000)
            history.push('/')
        } catch (error) {
            if(error.error&&error.error.name=="ValidationError"){
                setServerError("Please check the fields")
              }else{
                setServerError(error.response.data.message)
                ofwoodErrorhandler(error.response.data)
              }
        }
      }
    return (
    <PopUp
    onclick={props.onclick}
    classes={`gap-1 ${props.classes}`}
    popupClasses='login-popup'>
    <MaterialIcon
      classes='d-flex justify-content-center fs-1 icon-color-login-popup'
      title='person'
    />
      {serverError.length>0&&<Error>{serverError}</Error>}
      <label htmlFor="token">Please enter your verify code</label>
    <Input
      classes='p-1'
      type='text'
      placeholder='Verify code'
      datalabel='token'
      value={inputs.token}
      id="token"
      name="token"
      onchange={handleInputs}
      />
    {error.token.length>0&&<Error>{error.token}</Error>}
      <label htmlFor="password">Please enter your new password</label>
    <Input
      classes='p-1'
      type='password'
      placeholder='New password'
      id="password"
      name="password"
      datalabel='password'
      value={inputs.password}
      onchange={handleInputs}
      />
    {error.password.length>0&&<Error>{error.password}</Error>}
      <label htmlFor="passwordConfirm">Please enter your confirm password</label>
    <Input
      classes='p-1'
      type='password'
      name="passwordConfirm"
      placeholder='Confirm new password'
      datalabel='passwordConfirm'
      id="passwordConfirm"
      value={inputs.passwordConfirm}
      onchange={handleInputs}
    />
     {error.passwordConfirm.length>0&&<Error>Your password must be same</Error>}
    <Button
      onclick={handleResetBtn}
      classes='primary-button'>
      Reset password
    </Button>
  </PopUp>
  )
}

export default ResetPasswordPopUp