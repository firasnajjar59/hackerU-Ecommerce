import { useEffect, useState } from 'react';
import './changeUserImg.scss'
import axios from 'axios';
import Input from '../Input/Input';
import Button from '../Button/Button';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import ExpandSection from '../ExpandSection/ExpandSection';
import Box from '../Box/Box';
import useUpdateUserRedux from 'hooks/useUpdateUserRedux';
import useOfwoodErrorhandler from '../Errors/errorhandler';
import { useDispatch } from 'react-redux';
import { resetMessage, setMessage } from 'store/toast';


export const ChangeUserImg = () => {
  const dispatch=useDispatch()
  const ofwoodErrorhandler=useOfwoodErrorhandler()
    const [photo,setPhoto]=useState()
    const [photoName,setPhotoName]=useState("example.jpg/png")
    const updateUser=useUpdateUserRedux()
    useEffect(()=>{
      if(photo){
        try {
          if(!photo.type.startsWith("image")){
            setPhoto()
            setPhotoName("example.jpg/png")
            throw ({message:"Not Image"})
          }
          } catch (error) {
          ofwoodErrorhandler(error)
        }
      }
    },[photo])
    const handleImgSend=async()=>{
      try {
        const formData=new FormData();
        formData.append("photo",photo)
        let {data}= await axios.patch("/v1/users/updateme",formData,{ headers: {'Content-Type': 'multipart/form-data'}})
        setPhotoName("Image Uploaded")
        updateUser(data.data.token)
        dispatch(setMessage("The user image updated"))
            setTimeout(()=>{
              dispatch(resetMessage())
            },3000)
      } catch (error) {
        ofwoodErrorhandler(error.response.data)
      }
      
    }
  return (
    <Box classes="bg-secondary-ofwood">
      <ExpandSection title="Upload Image">
        <label htmlFor='photo' className='file-input-label'>
          Select Image
          <MaterialIcon title="image" />
          <Input type="file" classes="file-input" onchange={(ev)=>{setPhoto(ev.target.files[0]);setPhotoName(ev.target.files[0].name);console.log(ev);}} name="photo" id="photo" />
          <span className='file-name'>{photoName}</span>
        </label>
        <Button classes="primary-button" onclick={handleImgSend}>Send</Button>
      </ExpandSection>
    </Box>
  )
}
